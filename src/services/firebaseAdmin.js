import admin from "firebase-admin";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Firebase service account credentials
const serviceAccountPath = path.join(__dirname, "../config/firebaseConfig.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Firebase config file not found! Make sure firebaseConfig.json is in /config.");
  process.exit(1);
}

// Read and parse Firebase credentials
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
console.log("✅ Firebase initialized successfully!");

export { db };
