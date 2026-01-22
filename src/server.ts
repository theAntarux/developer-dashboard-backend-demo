import express, { Request, Response } from "express";
import cors from "cors";
import positionRoutes from "@/routes/positionRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: ["http://localhost:5173", "https://antarux.dev", "https://www.antarux.dev"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);


app.use("/game/v1/", positionRoutes);
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "These aren't the endpoints you're looking for."
    });
});

export default app;
