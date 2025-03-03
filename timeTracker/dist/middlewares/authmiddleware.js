import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        if (decoded && typeof decoded === "object" && "id" in decoded && "email" in decoded) {
            req.user = { id: decoded.id, email: decoded.email }; 
            next();
        }
        else {
            res.status(403).json({ message: "Invalid token payload" });
        }
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
