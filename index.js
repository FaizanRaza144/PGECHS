const express = require('express');
const app = express();
const {PORT} = require('./config/config');
const DBConnect = require('./Database/database');
const route = require('./Routes/routes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

app.use(cors(
    {
        origin:["https://pgechs-testing.vercel.app"],
        methods:["POST","PUT","GET","DELETE"],
        credentials:true
    }
));
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello");
})


DBConnect();

app.use(express.json());
app.use(route);
app.use(errorHandler); 

app.listen(PORT,console.log(`Server is running at: ${PORT}`))