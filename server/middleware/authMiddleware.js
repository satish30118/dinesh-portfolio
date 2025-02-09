import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Log for debugging

        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ success: false, message: "Token expired! Please refresh your session." });
        }

        return res.status(401).json({ success: false, message: "Invalid Token!" });
    }
};

export default verifyToken;
