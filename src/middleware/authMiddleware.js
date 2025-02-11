import admin from "firebase-admin";

// Middleware to verify Firebase authentication token
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <TOKEN>"

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Store user info in request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json({ error: "Forbidden: Invalid token", details: error.message });
  }
};
