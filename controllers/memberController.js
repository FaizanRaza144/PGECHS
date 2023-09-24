const memberModel = require('../models/members');
const Joi = require('joi');


const memberController = {
    async register(req,res,next){
        const memberSchema = Joi.object({
            name: Joi.string().required(),
            address:Joi.string().required(),
            email:Joi.string().required(),
            
        })
        const {error} = memberSchema.validate(req.body);
        if(error){
            return next(error);
        }
        const { name, address, phoneNumber,cnic} = req.body;
        let member;
        try {
            const memberToRegister = new memberModel({
                name,address,email,phoneNumber,cnic
            });
            member = await memberToRegister.save();
        } catch (error) {
            return next(error);
        }
        res.status(201).json({data:member,msg:"Member credentials saved successfully"});
    },
    async login(req,res,next){
        
    },
    async all(req,res,next){
        
    },
    async getById(req,res,next){
        
    },
    async delete(req,res,next){
        
    },
    async update(req,res,next){
        
    }
}
module.exports = memberController;