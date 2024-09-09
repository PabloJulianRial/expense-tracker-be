const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./transactions");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
