const { boolean } = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const members = new Schema({
    name:{
        type:String,
        require:true
    },
    address : {
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    cnic:{
        type:String,
        require:true
    },
    member_id:{
        type:mongoose.SchemaTypes.ObjectId,ref:"MemberRegMod",
        require:true
    },
},
    {timestamps:true}
);
module.exports = mongoose.model('Member',members);