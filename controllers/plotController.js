const Joi = require('joi');
const PlotsModel = require('../models/plots')



const plotController = {
    async add(req, res, next) {
        const plotToRegister = Joi.object({
            MemberID:Joi.string().required(),
            plotID: Joi.string().required(),
            dimensions: Joi.string().required(),
            plotType: Joi.string().required(),
            sqFeet: Joi.string().required(),
            location: Joi.string().required(),
            street: Joi.string().required(),
            block: Joi.string().required(),
        });
        const { error } = plotToRegister.validate(req.body);
        if (error) {
            return next(error);
        }
        const { MemberID, plotID, dimensions, plotType, sqFeet, location, street, block } = req.body;
        let plot;
        try {
            const plotExists = await PlotsModel.exists({plotID:plotID});
            if (plotExists) {
                const error = {
                    status: 409,
                    message: "Plot already exists/possessed"
                }
                return next(error);
            }
            const assignPlot = new PlotsModel({
                MemberID: MemberID,
                plotID: plotID,
                dimensions: dimensions,
                plotType: plotType,
                sqFeet: sqFeet,
                location: location,
                street: street,
                block: block
            })
            plot = await assignPlot.save();

        } catch (error) {
            return next(error);
        }
        res.status(200).json({
            data:plot,
            msg:"PLOTS ASSIGNED TO MEMBER"
        })


    },
    async all(req, res, next) {
        const{id} = req.params;
        let plots;
        try {
             plots = await PlotsModel.find({MemberID:id}).populate({
                path:"MemberID",
                populate:{
                    path:"member_id"
                }
             });         
            
             console.log("Plots: "+plots)
        } catch (error) {
            return next(error);
        }
        res.status(200).json({data:plots,msg:"All plots of member fetched successfully"});
    },
    async getById(req, res, next) {
        const {id} = req.params;
        let plots;
        try {
            plots = await PlotsModel.find({_id:id}).populate({
                path:"MemberID",
                populate:{
                    path:"member_id"
                }
            });
        } catch (error) {
            return next(error);
        }
        res.status(200).json({
            data:plots,
            msg:"Plot Details Fetched Successfully"
        });
    },
    async delete(req, res, next) {
        const {id} = req.params;
        let status;
        try {
            status = await PlotsModel.findByIdAndDelete(id)
        } catch (error) {
            return next(error);
        }
        res.status(200).json({msg:"plot deleted successfully", data:status });
    },
    async update(req, res, next) {
        const {id}= req.params;
        let updatedStatus;
        try{
            const getplot = await PlotsModel.findById(id);
            updatedStatus = await PlotsModel.updateOne({_id:getplot._id},
                { $set: { status: false } },
                { new: true }
                )
        }catch(error){
            return next(error);
        }
        res.status(200).json({
            data:updatedStatus,
            msg:"Plots Status updated Successfully"
        });    
    }
}

module.exports = plotController;