var async = require('async');
var mongoose = require('mongoose');
var moment = require('moment');


exports.getpatientbills = function(req,res) {

    let queryParams = req.params

    if (!queryParams.fromdate || !queryParams.todate) {
        return res.status(200).json([]);
    }

    let fromDate = new Date(moment(queryParams.fromdate).format('YYYY-MM-DD'));
    let toDate = new Date(moment(queryParams.todate).format('YYYY-MM-DD'));

    var query = {statusflag: 'A', $and:[{createdat:{$gte:fromDate}},{createdat:{$lte:toDate}}]};
    mongoose.connection.db.collection("dw_patientbills").find(query,function(error,patientbills){
        if (error){
            res.status(500).json({error:error});
        }
        else {
            res.status(200).json({patientbills:patientbills});
        }
    })
}

exports.getPatientBilledItem = function(req,res) {
    var query = {statusflag:'A', $and:[{createdat:{$gte:req.body.fromdate}},{createdat:{$lte:req.body.todate}}]}
    mongoose.connection.db.collection("dw_patientbilleditems").find(query), function(error,patientbilleditems) {
        if (error) {
            res.status(500).json({error:error});
        }
        else {
            res.status(200).json({patientbilleditems:patientbilleditems})
        }
    }
}


exports.getlabbillingdatas = function(req, res){
    var query = {statusflag:'A', $and:[{createdat:{$gte:req.body.fromdate}},{createdat:{$lte:req.body.todate}}]}
    mongoose.connection.db.collection("dw_billingdata").find(query),function(error, labbillingdatas ){
    if(error){
        res.status(500).json({error:error});
    }
    else{
        res.status(200).json({labbillingdatas:labbillingdatas})
    }
  }
}

var query = {statusflag: 'A', $and:[{createdat:{$gte:fromDate}},{createdat:{$lte:toDate}}]};
    mongoose.connection.db.collection("dw_patientbills").find(query,function(error,patientbills){
        if (error){
            res.status(500).json({error:error});
        }
        else {
            res.status(200).json({patientbills:patientbills});
        }
    })

exports.getdeathrecords = function(req, res){
    var query = {statusflag:'A',$and:[{createdat:{$gte:req.body.fromdate}},{createdat:{$lte:req.body.todate}}]};
    mongoose.connection.db.collection("").find(query, function(error, deathrecords){
       if(error){
           res.status(500).json({error:error});
       } else {
           res.status(200).json({deathrecords:deathrecords})
       }
    })
}

exports.getoutpatientfootfall = function(req,res){
    var query = {statusflag:'A',$and:[{createdat:{$gte:req.params.fromDate}},{$lte:req.params.todate}]};

    mongoose.connection.db.collection('dw_opdvisits').aggregate([
      {$match:{statusflag:'A',$and:[{createdat:{$gte:req.params.fromDate}},{$lte:req.params.todate}]}},
      { $lookup: { from: 'organisations', localField: 'orguid', foreignField: '_id', as: 'org' } },
      { $unwind: { path: '$org', preserveNullAndEmptyArrays: true } },  
      { $lookup: { from: 'organisations', localField: 'org.parentorguid', foreignField: '_id', as: 'parentorg' } },
      { $unwind: { path: '$parentorg', preserveNullAndEmptyArrays: true } },
      {$project:{hospital:'$parentorg.name',hospitalunit:'$org.name',org:0,parentorg:0}}  
    ]).toArray(function(error, outpatientfootfall){
        if(error){
            res.status(500).json({error:error})
        }else
        {
            res.status(200).json({outpatientfootfall:outpatientfootfall})
        }
    });
}
