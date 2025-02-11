import { db } from "./firebaseAdmin.js";

async function testFirestore() {
  try {
    const testDocRef = db.collection("testCollection").doc("testDoc");
    await testDocRef.set({ message: "Hello from Firestore!", timestamp: new Date() });

    console.log("✅ Firestore document written successfully!");
    const doc = await testDocRef.get();
    console.log("📄 Firestore Document:", doc.data());
  } catch (error) {
    console.error("❌ Firestore Error:", error);
  }
}

testFirestore();
