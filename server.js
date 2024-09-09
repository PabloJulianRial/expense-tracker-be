const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./transactions");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://expense-tracker-webdevchef.netlify.app",
  })
);
app.use(express.json());

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/expense-tracker";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;

    if (!amount || !description || !date || !category) {
      return res.status(400).send("All fields are required");
    }

    const newTransaction = new Transaction({
      amount,
      description,
      date,
      category,
    });

    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const transactionId = req.params.id;
    const result = await Transaction.deleteOne({ _id: transactionId });
    res.json({ message: "Transaction removed" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
