import { Client, Storage, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

// Set the endpoint and project ID
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint if self-hosted
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize the Storage service
const storage = new Storage(client);

// Function to upload a file
export const uploadFile = async (file: File, permissions: string[] = ['role:all']) => {
    try {
        const result = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
            ID.unique(),
            file,
            permissions
        );
        return result;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

// Function to get a file download URL
export const getFileDownloadUrl = (fileId: string) => {
    return storage.getFileDownload(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
        fileId
    );
};

// Function to get a file view URL
export const getFileViewUrl = (fileId: string) => {
    return storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
        fileId
    );
};

// Function to delete a file
export const deleteFile = async (fileId: string) => {
    try {
        await storage.deleteFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
            fileId
        );
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

// Function to list files
export const listFiles = async () => {
    try {
        const result = await storage.listFiles(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || ''
        );
        return result;
    } catch (error) {
        console.error('Error listing files:', error);
        throw error;
    }
};

export { client, storage, ID };