const Joi = require("joi");
const LedgerModel = require('../models/ledgers');



const ledger = {
    async add(req, res, next) {
        const ledgerSchema = Joi.object({
            MemberID: Joi.string().required(),
            particulars: Joi.string().required(),
            chequeOrDraft: Joi.string().required(),
            Slip: Joi.number().required(),
            debit: Joi.number().required(),
            credit: Joi.number().required(),
            balance: Joi.number().required(),
        });
        const { error } = ledgerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { MemberID, particulars, chequeOrDraft, Slip, debit, credit, balance } = req.body;
        let ledger;
        try {
            const ledgerToAdd = new LedgerModel({
                MemberID: MemberID,
                particulars: particulars,
                chequeORdraft: chequeOrDraft,
                Slip: Slip,
                debit: debit,
                credit: credit,
                balance: balance,
                date: new Date()
            });
            ledger = await ledgerToAdd.save();
        } catch (error) {
            return next(error);
        }
        res.status(200).json({ data: ledger, msg: "Ledger Added Successfully" });

    },
    async all(req, res, next) {
        const{id} = req.params;
        let ledgers;
        try {
             ledgers = await LedgerModel.find({MemberID:id}).populate({
                path:"MemberID",
                populate:{
                    path:"member_id"
                }
             });         
            
             console.log("Ledger: "+ledgers)
        } catch (error) {
            return next(error);
        }
        res.status(200).json({data:ledgers,msg:"All Ledgers of member fetched successfully"});

    },
    async getById(req, res, next) {
        const {id} = req.params;
        let ledger;
        try {
            ledger = await LedgerModel.find({_id:id}).populate('MemberID');
        } catch (error) {
            return next(error);
        }
        res.status(200).json({
            data:ledger,
            msg:"Ledger Fetched Successfully"
        });
    },
    async delete(req, res, next) {
        const {id} = req.params;
        let status;
        try {
            status = await LedgerModel.findByIdAndDelete(id)
        } catch (error) {
            return next(error);
        }
        res.status(200).json({msg:"Ledger deleted successfully", data:status });
    },
    async updateStatus(req, res, next) {
        const {id}= req.params;
        let updatedStatus;
        try{
            const getledger = await LedgerModel.findById(id);
            updatedStatus = await LedgerModel.updateOne({_id:getledger._id},
                { $set: { LedgerStatus: false } },
                { new: true }
                )
        }catch(error){
            return next(error);
        }
        res.status(200).json({
            data:updatedStatus,
            msg:"Ledger Status updated Successfully"
        })
    }
}

module.exports = ledger;
