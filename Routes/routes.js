const express = require('express');
const route = express.Router();
const memberController= require('../controllers/memberController');
const plotController = require('../controllers/plotController');
const accounts = require('../controllers/accounts');
const ledger = require('../controllers/ledger');
const adminController = require('../controllers/adminController');

//Admin Routes
route.post('/admin',adminController.login);
route.put('/admin/passwordReset/:id',adminController.passwordReset);
route.post('/admin/permissions',adminController.permissions);
route.post('/admin/role',adminController.role);
route.get('/admin/getAllUsers',adminController.getAllUsers);
route.get('/admin/role/getAllRoles',adminController.getAllUsers);
route.post('/admin/Register',adminController.Register);
route.post('/admin/logout',adminController.logout);




//MEMBERS MANAGEMENT******************************************************

//Members login Route
route.post('/members',memberController.login);

//Members Register Route
route.post('/members/membersRegister',memberController.register);
route.post('/members/addDetails',memberController.addDetails);
//View ALL members
route.get('/members/all',memberController.all);

//View member by id
route.get('/members/getbyid/:id',memberController.getById);

//Edit member by id
route.put('/members/update/:id',memberController.update);

//Delete member by id
route.delete('/members/delete/:id', memberController.delete);






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

module.exports = route;