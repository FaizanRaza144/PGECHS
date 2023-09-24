const mongoose = require('mongoose');
const {Schema} = mongoose;

const ledger = new Schema({
    LedgerID:{
        type:Number,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    particulars:{
        type:String,
        require:true
    },
    chequeORdraft:{
        type:String,
        require:true
    },
    Slip:{
        type:Number,
        require:true
    },
    debit:{
        type:Number,
        require:true
    },
    credit:{
        type:Number,
        require:true
    },
    balance:{
        type:Number,
        require:true
    }
},
    {timestamps:true}
);
module.exports = mongoose.model('Ledger',ledger)