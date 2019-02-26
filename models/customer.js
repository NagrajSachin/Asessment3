const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    branchId :
    {
        type : Number,
        required : true
    },
    agentId :
    {
        type : Number,
        required : true
    },
    customerId : 
    {
        type : Number,
        required : true
    },
    firstname :
    {
        type : String,
        required : true
    },
    lastname :
    {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('customer', Customer);