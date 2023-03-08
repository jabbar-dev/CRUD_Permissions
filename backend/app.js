const express = require('express');
const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/companies', companyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
