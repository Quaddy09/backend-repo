import { db } from "../services/firebaseAdmin.js";

// 📌 Create User (POST /users)
export const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ error: "All fields (name, email, age) are required" });
    }

    const newUserRef = db.collection("users").doc();
    const user = {
      id: newUserRef.id,
      name,
      email,
      age,
      createdAt: new Date(),
    };

    await newUserRef.set(user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get All Users (GET /users)
export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => doc.data());

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get User by ID (GET /users/:id)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await db.collection("users").doc(id).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Update User (PUT /users/:id)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userRef = db.collection("users").doc(id);

    await userRef.update(req.body);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Delete User (DELETE /users/:id)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("users").doc(id).delete();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
