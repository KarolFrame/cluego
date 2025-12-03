import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import experienceRouter from "./routes/experience-routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/experiences", experienceRouter);

app.get("/", (_req, res) => {
  res.send("ClueGo API running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
