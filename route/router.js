const express = require('express');
const bodyParser = require('body-parser');
const Branch = require('../models/branch');
const Agent = require('../models/agent');
const Customer = require('../models/customer');
const router = express.Router();

router.use(bodyParser.json());

//to fetch all the branches of that bank 
// i just used find method for this
//i used aggregation in the below operations
router.get('/getbranches',(req,res,next)=>{
    Branch.find({})
    .then((data) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(data);
    }).catch((err) => { next(err) });
});

//to get all the users with their name and roles
router.get('/getagents', (req, res, next) => {
    Branch.aggregate([
        { $match: { branchId: 100 } },
        {
            $lookup:
            {
                from: "agents",
                localField: "branchId",
                foreignField: "branchId",
                as: "agents"
            }
        },
        { $unwind: "$agents" },
        {
            $project:
            {
                _id: 0,
                branchName: 1,
                userId: "$agents.agentId",
                userName: "$agents.agentName",
                userRole: "$agents.agentRole",
            }
        },
    ])
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(data);
        }).catch((err) => { next(err) });
});


//getting all the customers from the particular branch
router.get('/getcustomers', (req, res, next) => {
    Branch.aggregate([
        { $match: { branchId: 100 } },
        {
            $lookup:
            {
                from: "customers",
                localField: "branchId",
                foreignField: "branchId",
                as: "customers"
            }
        },
        { $unwind: "$customers" },
        {
            $project:
            {
                _id: 0,
                branchName: 1,
                customerId : "$customers.customerId",
                customerFname : "$customers.firstname",
                customerlname : "$customers.lastname",
            }
        },
    ])
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(data);
        }).catch((err) => { next(err) });
});

module.exports = router;