const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create a new Express app
const app = express();

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a new Mongoose schema and model for companies
const companySchema = new mongoose.Schema({
  companyId: Number,
  CompanyName: String,
  City: String,
  Country: String,
  ZipCode: String,
  Address: String,
  Lat: Number,
  Lng: Number,
  ContactNumber: String,
});

const Company = mongoose.model("Company", companySchema);

// Define a new Express router for API endpoints
const router = express.Router();

// Define a route for getting all companies
router.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Define a route for creating a new company
router.post("/companies", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Define a route for updating a company
router.put("/companies/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findOneAndUpdate(
      { companyId },
      req.body,
      { new: true }
    );
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Define a route for deleting a company
router.delete("/companies/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    await Company.deleteOne({ companyId });
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Use the router for all API endpoints starting with "/api"
app.use("/api", router);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
