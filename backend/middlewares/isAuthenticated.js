import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Look for token in cookie OR Authorization Bearer header
        let token = req.cookies.token;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Please log in.",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid or expired token.",
                success: false
            });
        }

        req.id = decode.userId;
        req.role = decode.role;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({
            message: "Authentication failed.",
            success: false
        });
    }
};

export default isAuthenticated;
