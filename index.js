import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import transactionsRouter from "./routes/transactionsRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/v1", transactionsRouter);

app.listen(PORT, () => {
  console.log(`App is running on port  ${PORT}`);
});
