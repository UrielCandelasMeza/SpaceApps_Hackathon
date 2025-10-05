import express from "express";
import cors from "cors";
import FileRouter from "./routes/file.routes";
import HistoryRouter from "./routes/history.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", FileRouter);
app.use("/api", HistoryRouter);

export default app;
