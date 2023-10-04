const express = require('express');
const app = express();
const {PORT} = require('./config/config');
const DBConnect = require('./Database/database');
const route = require('./Routes/routes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');


app.use(express.json());


DBConnect();

const allowedOrigins = ['http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins array
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);


app.get("/",(req,res)=>{
    res.status(200).send({msg:"Welcome to PGECHS"})
})

app.use(route);
app.use(errorHandler); 
app.use(express.static('LocalStorage'));

app.listen(PORT,console.log(`Server is running at: ${PORT}`))