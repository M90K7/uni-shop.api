import { connect, set } from "mongoose";

set('strictQuery', true);

let isConnected = false;

export async function useDb() {
  if (isConnected) return;

  await connect('mongodb://127.0.0.1:27017/shopDb');
  isConnected = true;

  console.log('MongoDB connected');
}