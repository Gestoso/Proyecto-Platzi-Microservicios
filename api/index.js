const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config');     
const user = require('./components/user/network'); 

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/api/components/user', user);
 
app.use((err, req, res, next) => {
  console.error('🔥 Error detectado:', err);

  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Error interno en el servidor',
  });
});
 
app.listen(config.api.port, () => {
  console.log('Api en puerto:', config.api.port);
});

module.exports = app;
