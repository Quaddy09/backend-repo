import { db } from "./firebaseAdmin.js";

async function testFirestore() {
  try {
    const docRef = db.collection("test").doc("testDoc");
    await docRef.set({ message: "Hello, Firestore!" });
    console.log("✅ Firestore test document written successfully.");

    const doc = await docRef.get();
    console.log("📄 Document data:", doc.data());
  } catch (error) {
    console.error("❌ Error testing Firestore:", error);
  }
}

testFirestore();
