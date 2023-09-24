const express = require('express');
const app = express();
const {PORT} = require('./config/config');
const DBConnect = require('./Database/database');
const route = require('./Routes/routes');
const errorHandler = require('./middleware/errorHandler');

DBConnect();

app.use(express.json());
app.use(route);
app.use(errorHandler); 

app.listen(PORT,console.log(`Server is running at: ${PORT}`))