import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

// Securely load Firebase credentials
const serviceAccountPath = path.join(__dirname, "../config/firebaseConfig.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Firebase config file not found!");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export { db };
