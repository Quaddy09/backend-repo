import express from "express";
import cors from "cors";
import { db } from "./services/firebaseAdmin.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🔥 EBUDDY Backend is running!");
});

// Firestore Test Route
app.get("/test-firestore", async (req, res) => {
  try {
    const testDocRef = db.collection("testCollection").doc("testDoc");
    const doc = await testDocRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "No document found!" });
    }

    res.json({ data: doc.data() });
  } catch (error) {
    console.error("Firestore Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
