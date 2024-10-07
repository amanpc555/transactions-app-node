import express from "express";
import TransactionController from "../controllers/transactionController.js";
import { transactionValidator } from "../middlewares/transactionMiddleware.js";

const router = express.Router();
router.get("/transactions", TransactionController.getTransactions);
router.post("/transaction", transactionValidator, TransactionController.addTransactions);
export default router;
