const express = require('express');
const app = express();
const {PORT} = require('./config/config');
const DBConnect = require('./Database/database');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const route = express.Router();
const memberController= require('./controllers/memberController');
const plotController = require('./controllers/plotController');
const accounts = require('./controllers/accounts');
const ledger = require('./controllers/ledger');
const adminController = require('./controllers/adminController');

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

//Admin Routes
route.post('/admin',adminController.login);
route.put('/admin/passwordReset/:id',adminController.passwordReset);
route.post('/admin/permissions',adminController.permissions);
route.post('/admin/memberRegister',adminController.registerMember);
route.get('/admin/getAllUsers',adminController.getAllUser);
route.post('/admin/role',adminController.role);
route.post('/admin/Register',adminController.Register);
route.post('/admin/logout',adminController.logout);
//MEMBERS MANAGEMENT******************************************************
//Members login Route
route.post('/members',memberController.login);

//Members Register Route
route.post('/members/membersRegister',memberController.register);

//View ALL members
route.get('/members/all',memberController.all);

//View member by id
route.get('/members/:id',memberController.getById);

//Edit member by id
route.put('members/:id',memberController.update);

//Delete member by id
route.delete('/members/:id', memberController.delete);

//PLOTS**************************************************************
//Add Plots
route.get('/plots',plotController.add);

//Add pLot
route.post('/plots/all',plotController.all);

//View Plots By ID
route.get('/plots/:id',plotController.getById);

//Delete Plots By ID
route.delete('/plots/:id',plotController.delete);

//Update Plot
route.put('/plots/:id',plotController.update);

//Accounts*****************************************************************
route.post('/accounts',accounts.add);
route.get('/accounts/all',accounts.all);
route.get('/getAccountById/:id',accounts.getById);
route.put('/accounts/:id',accounts.update);
route.delete('/account/:id',accounts.delete);

//LEDGERS**********************************************************************
route.post('/ledger',ledger.add);
route.get('/ledger/all',ledger.all);
route.get('/ledger/:id',ledger.getById);
route.put('/ledger/:id',ledger.update);
route.delete('/ledger/:id',ledger.delete);
DBConnect();

app.use(express.json());
app.use(route);
app.use(errorHandler); 

app.listen(PORT,console.log(`Server is running at: ${PORT}`))