// Token management for Sally AI
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const TOKENS_PER_DAY = 10; // Default tokens per day

// Generate a unique user ID if not exists
export function getUserId(): string {
  let userId = localStorage.getItem('sally_user_id');
  
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('sally_user_id', userId);
  }
  
  return userId;
}

// Initialize user in Firebase if not exists
export async function initializeUser(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    const today = new Date().toISOString().split('T')[0];
    await setDoc(userRef, {
      tokens_remaining: TOKENS_PER_DAY,
      last_reset: today,
      total_messages: 0
    });
  } else {
    // Check if we need to reset tokens (new day)
    const userData = userDoc.data();
    const today = new Date().toISOString().split('T')[0];
    
    if (userData.last_reset !== today) {
      await updateDoc(userRef, {
        tokens_remaining: TOKENS_PER_DAY,
        last_reset: today
      });
    }
  }
  
  return getTokensRemaining(userId);
}

// Get remaining tokens for user
export async function getTokensRemaining(userId: string): Promise<number> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return 0;
  }
  
  return userDoc.data().tokens_remaining;
}

// Use a token
export async function useToken(userId: string): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists() || userDoc.data().tokens_remaining <= 0) {
    return false;
  }
  
  await updateDoc(userRef, {
    tokens_remaining: increment(-1),
    total_messages: increment(1)
  });
  
  return true;
}