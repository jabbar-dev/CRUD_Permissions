const mongoose = require('../db');

const companySchema = new mongoose.Schema({
  companyId: {
    type: Number,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
