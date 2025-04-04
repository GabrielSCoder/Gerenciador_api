export const corsConfig = {
    origin: [
        process.env.FRONT_URL || "",
        "http://localhost:8080",
        "http://192.168.1.13:3000",
        "http://localhost:4000",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3000",
        "http://192.168.1.13:3001",
        "http://localhost:5500",
        "http://192.168.1.13:8080",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "HMAC", "Timestamp"],
    exposedHeaders: ["Authorization"],
    credentials: true
}
