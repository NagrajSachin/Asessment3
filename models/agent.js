   const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Agent = new Schema({
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
    agentName :
    {
        type : String,
        required : true
    },
    agentRole : 
    {
        type : String,
        required : true
    },
    supervisorId :
    {
        type : Number,
    }
});

module.exports = mongoose.model('agent', Agent);