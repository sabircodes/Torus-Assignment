import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('YOUR_APPWRITE_ENDPOINT') // Your API Endpoint
    .setProject('YOUR_PROJECT_ID');        // Your project ID

export const account = new Account(client); 