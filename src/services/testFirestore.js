import { db } from "./firebaseAdmin.js";

// Function to test Firestore connection
async function testFirestore() {
  try {
    // Writing test data
    const testDocRef = db.collection("testCollection").doc("testDoc");
    await testDocRef.set({
      message: "Hello from Firestore!",
      timestamp: new Date()
    });

    console.log("✅ Test document written to Firestore!");

    // Reading the document
    const doc = await testDocRef.get();
    if (doc.exists) {
      console.log("📌 Firestore Document:", doc.data());
    } else {
      console.log("⚠️ No document found!");
    }
  } catch (error) {
    console.error("❌ Error connecting to Firestore:", error);
  }
}

testFirestore();
