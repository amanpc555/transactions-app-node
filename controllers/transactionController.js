import { validationResult } from "express-validator";
import Transaction from "../models/transactions.js";

class TransactionController {
  static async getTransactions(req, res) {
    try {
      const transactions = await Transaction.find().sort({ _id: -1 });
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  }

  static async addTransactions(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { type, amount, description } = req.body;

      const balanceRecord = await Transaction.findOne()
        .sort({ _id: -1 })
        .limit(1);
      let balance = balanceRecord ? balanceRecord.balance : 0;
      
      let credit = 0;
      let debit = 0;
      if (type === "credit") {
        balance += amount;
        credit = amount;
      } else if (type === "debit") {
        if (balance < amount) {
          return res.status(400).json({ message: "Insufficient balance" });
        }
        balance -= amount;
        debit = amount;
      } else {
        return res.status(400).json({ message: "Invalid transaction type" });
      }

      const transaction = new Transaction({
        type,
        credit,
        debit,
        balance,
        description,
      });

      await transaction.save();

      res.status(201).json({
        message: "Transaction saved successfully",
      });
    } catch (err) {
        console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res
        .status(err.statusCode)
        .json({ message: "Failed to save transaction" });
    }
  }
}

export default TransactionController;
