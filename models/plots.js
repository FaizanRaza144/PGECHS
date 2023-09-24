const { boolean } = require('joi');
const mongoose = require('mongoose');
const{Schema} = mongoose;

const plots = new Schema({
    plotID:{
        type:Number,
        require:true
    },
    dimensions:{
        type:String,
        require:true
    },
    plotType:{
        type:true,
        require:true
    },
    sqFeet:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    status:{
        type: boolean,
        require:true,
        default:true
    }
},
    {timestamps:true}
)

module.exports = mongoose.model('Plot',plots);