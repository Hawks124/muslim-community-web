"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiSend,
  FiX,
  FiMessageCircle,
  FiInfo,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import { generateResponse } from "@/lib/gemini";
import {
  getUserId,
  initializeUser,
  useToken,
  getTokensRemaining,
} from "@/lib/tokenManager";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  text: string;
  sender: "user" | "sally";
  timestamp: number;
  tokenUsage?: number | null;
};

export default function SallyAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokensRemaining, setTokensRemaining] = useState(0);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [showDownloadSuggestion, setShowDownloadSuggestion] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionId = useRef<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize user and load chat history
  useEffect(() => {
    const initChat = async () => {
      try {
        // Check online status
        setIsOffline(!navigator.onLine);

        // Get or create user ID
        const id = getUserId();
        setUserId(id);

        // Initialize user in Firebase
        const tokens = await initializeUser(id);
        setTokensRemaining(tokens);

        // Show download suggestion if tokens are low
        if (tokens <= 3) {
          setShowDownloadSuggestion(true);
        }

        // Get or create chat session ID
        let sessionId = localStorage.getItem("sally_session_id");
        if (!sessionId) {
          sessionId = uuidv4();
          localStorage.setItem("sally_session_id", sessionId);
        }
        chatSessionId.current = sessionId;

        // Load chat history
        await loadChatHistory(sessionId);
      } catch (error) {
        console.error("Error initializing chat:", error);
        setError(
          "Impossible de se connecter au service. Veuillez réessayer plus tard."
        );
      }
    };

    initChat();

    // Monitor online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Auto-resize textarea but limit to 5 lines
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 5 * 24); // Assuming line height is ~24px
      textarea.style.height = `${newHeight}px`;
    };

    textarea.addEventListener("input", adjustHeight);
    adjustHeight(); // Initial adjustment

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [inputValue]);

  // Load chat history from Firebase
  const loadChatHistory = async (sessionId: string) => {
    try {
      if (isOffline) {
        // If offline, use a default welcome message
        const welcomeMessage: Message = {
          id: uuidv4(),
          text: "Assalamu alaikum! Je suis Sally, votre assistante IA polyvalente. Comment puis-je vous aider aujourd'hui?",
          sender: "sally",
          timestamp: Date.now(),
        };
        setMessages([welcomeMessage]);
        return;
      }

      const chatRef = doc(db, "chats", sessionId);
      const chatDoc = await getDoc(chatRef);

      if (chatDoc.exists()) {
        const chatData = chatDoc.data();

        // If there's no welcome message, add one
        if (chatData.messages && chatData.messages.length > 0) {
          setMessages(chatData.messages);
        } else {
          const welcomeMessage: Message = {
            id: uuidv4(),
            text: "Assalamu alaikum! Je suis Sally, votre assistante IA polyvalente. Comment puis-je vous aider aujourd'hui?",
            sender: "sally",
            timestamp: Date.now(),
          };
          setMessages([welcomeMessage]);
          await saveMessage(welcomeMessage, sessionId);
        }
      } else {
        // Create a new chat with welcome message
        const welcomeMessage: Message = {
          id: uuidv4(),
          text: "Assalamu alaikum! Je suis Sally, votre assistante IA polyvalente. Comment puis-je vous aider aujourd'hui?",
          sender: "sally",
          timestamp: Date.now(),
        };
        setMessages([welcomeMessage]);
        await saveMessage(welcomeMessage, sessionId);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      // If there's an error, still show a welcome message
      const welcomeMessage: Message = {
        id: uuidv4(),
        text: "Assalamu alaikum! Je suis Sally, votre assistante IA polyvalente. Comment puis-je vous aider aujourd'hui?",
        sender: "sally",
        timestamp: Date.now(),
      };
      setMessages([welcomeMessage]);
    }
  };

  // Save message to Firebase
  const saveMessage = async (message: Message, sessionId: string) => {
    if (isOffline) return; // Don't try to save if offline

    try {
      const chatRef = doc(db, "chats", sessionId);
      const chatDoc = await getDoc(chatRef);

      if (chatDoc.exists()) {
        // Update existing chat
        const chatData = chatDoc.data();
        const updatedMessages = [...chatData.messages, message];
        await setDoc(chatRef, { messages: updatedMessages }, { merge: true });
      } else {
        // Create new chat
        await setDoc(chatRef, {
          userId: userId,
          createdAt: Date.now(),
          messages: [message],
        });
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check if user has tokens remaining
    if (tokensRemaining <= 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: "Vous avez atteint votre limite de messages pour aujourd'hui.",
          sender: "sally",
          timestamp: Date.now(),
        },
      ]);
      setShowDownloadSuggestion(true);
      return;
    }

    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      text: inputValue,
      sender: "user",
      timestamp: Date.now(),
    };

    // Add user message to state
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Save user message to Firebase
    await saveMessage(userMessage, chatSessionId.current);

    // Use a token
    const canProceed = await useToken(userId);

    if (!canProceed) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: "Vous avez atteint votre limite de messages pour aujourd'hui.",
          sender: "sally",
          timestamp: Date.now(),
        },
      ]);
      setShowDownloadSuggestion(true);
      setIsLoading(false);
      return;
    }

    // Update tokens remaining
    const tokens = await getTokensRemaining(userId);
    setTokensRemaining(tokens);

    // Show download suggestion if tokens are low
    if (tokens <= 3) {
      setShowDownloadSuggestion(true);
    }

    try {
      // Format chat history for Gemini API
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: msg.text,
      }));

      // Get response from Gemini
      const response = await generateResponse(inputValue, chatHistory);

      // Create Sally message
      const sallyMessage: Message = {
        id: uuidv4(),
        text: response.text,
        sender: "sally",
        timestamp: Date.now(),
        tokenUsage: response.tokenUsage,
      };

      // Add Sally message to state
      setMessages((prev) => [...prev, sallyMessage]);

      // Save Sally message to Firebase
      await saveMessage(sallyMessage, chatSessionId.current);
    } catch (error) {
      console.error("Error generating response:", error);

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        text: "Je suis désolée, j'ai rencontré une erreur. Pourriez-vous reformuler votre question?",
        sender: "sally",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      await saveMessage(errorMessage, chatSessionId.current);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center shadow-xl hover:shadow-green-500/20 transition-shadow duration-300 z-[1000] border-2 border-green-400/20"
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -5, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/logo.png"
          alt="Chat with Sally"
          width={40}
          height={40}
          className="drop-shadow-lg"
        />
      </motion.button>
      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/80 backdrop-blur-lg w-full max-w-xs sm:max-w-sm md:max-w-md h-[500px] sm:h-[550px] md:h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-xl flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Chat header */}
              <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-green-900/50 to-black/50">
                <div className="flex items-center">
                  <Image
                    src="/sally.png"
                    alt="Sally AI"
                    width={36}
                    height={36}
                    className="mr-3"
                  />
                  <div>
                    <h3 className="text-white font-medium text-sm sm:text-base">
                      Sally AI
                    </h3>
                    <p className="text-green-400 text-xs">
                      Votre assistante personnelle
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Token counter */}
              <div className="px-3 sm:px-4 py-2 bg-black/30 flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-400">
                  <FiInfo className="mr-1" />
                  <span>Version limitée </span>
                </div>
                <div className="text-xs text-gray-400">
                  Messages restants:{" "}
                  <span
                    className={`font-medium ${
                      tokensRemaining <= 3 ? "text-amber-400" : "text-green-400"
                    }`}
                  >
                    {tokensRemaining}
                  </span>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="px-3 sm:px-4 py-2 bg-red-500/20 text-red-300 text-xs sm:text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {error}
                  <button
                    className="ml-2 underline"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    Réessayer
                  </button>
                </div>
              )}

              {/* Offline warning */}
              {isOffline && (
                <div className="px-3 sm:px-4 py-2 bg-yellow-500/20 text-yellow-300 text-xs sm:text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Vous êtes actuellement hors ligne. Certaines fonctionnalités
                  peuvent être limitées.
                </div>
              )}

              {/* Download suggestion */}
              {showDownloadSuggestion && (
                <motion.div
                  className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-900/30 to-green-800/20 border-t border-b border-green-500/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500/20 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                      <FiDownload className="text-green-400 text-xs sm:text-sm" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-xs sm:text-sm font-medium">
                        Téléchargez l'application IRA
                      </h4>
                      <p className="text-gray-400 text-xs hidden sm:block">
                        Utilisez Sally AI sans restrictions
                      </p>
                    </div>
                    <motion.button
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        window.open(
                          "https://play.google.com/store/apps/details?id=com.muslimcommunity",
                          "_blank"
                        )
                      }
                    >
                      Télécharger
                      <FiArrowRight className="ml-1" size={12} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-black/50 to-gray-900/20">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* Message bubble */}
                    <div className="flex flex-col max-w-[85%]">
                      <div
                        className={`rounded-2xl px-3 sm:px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-green-600 text-white ml-auto rounded-tr-none"
                            : "bg-gray-800/80 text-white border border-white/10 rounded-tl-none"
                        }`}
                      >
                        {message.sender === "sally" ? (
                          <div
                            className="prose prose-sm prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: message.text }}
                          />
                        ) : (
                          message.text
                        )}
                      </div>

                      {/* Token usage info for Sally messages */}
                      {message.sender === "sally" && message.tokenUsage && (
                        <div className="text-xs text-gray-500 mt-1 ml-2">
                          Tokens: {message.tokenUsage}
                        </div>
                      )}
                    </div>

                    {/* User avatar for user messages */}
                    {message.sender === "user" && (
                      <div className="flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-700 ml-2 mt-1 flex items-center justify-center">
                        <svg
                          className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {/* Enhanced loading animation */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/80 text-white border border-white/10 rounded-tl-none">
                      <div className="flex items-center">
                        <motion.div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                        <span className="ml-2 text-xs sm:text-sm text-gray-400">
                          Sally réfléchit...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-3 sm:p-4 border-t border-white/10 bg-black/50">
                <div className="flex items-center">
                  <textarea
                    ref={textareaRef}
                    className="flex-1 bg-gray-800/80 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-[40px] max-h-[120px]"
                    placeholder="Posez une question à Sally..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading || tokensRemaining <= 0}
                  />
                  <motion.button
                    className={`ml-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                      inputValue.trim() && !isLoading && tokensRemaining > 0
                        ? "bg-green-600"
                        : "bg-gray-700"
                    } text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSendMessage}
                    disabled={
                      !inputValue.trim() || isLoading || tokensRemaining <= 0
                    }
                  >
                    <FiSend size={16} className="sm:text-lg" />
                  </motion.button>
                </div>
                {tokensRemaining <= 0 && (
                  <p className="mt-2 text-xs text-amber-400">
                    Vous avez atteint votre limite de messages pour aujourd'hui.
                    Téléchargez l'application IRA pour continuer à discuter avec
                    Sally sans restrictions!
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                  <span className="hidden sm:inline">
                    Sally est en version limitée. Téléchargez l'application IRA
                    pour une utilisation sans limite.{" "}
                  </span>
                  <span className="sm:hidden">Version de test</span>
                  {tokensRemaining > 0 && (
                    <span className="text-green-400">
                      {tokensRemaining} messages restants
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
