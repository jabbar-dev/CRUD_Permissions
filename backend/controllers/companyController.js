const Company = require('../models/companyModel');

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      status: 'success',
      data: {
        companies,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({ companyId: req.params.id });
    if (!company) {
      return res.status(404).json({
        status: 'error',
        message: 'Company not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        company,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({
      status: 'success',
      data: {
        company,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { companyId: req.params.id },
      req.body,
      { new: true }
    );
    if (!company) {
      return res.status(404).json({
        status: 'error',
        message: 'Company not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        company,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};