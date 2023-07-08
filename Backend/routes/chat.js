const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/sp_chat_list/:id',(req,res)=>{
    let sql = "Select DISTINCT user_id,name From chat c,users u where u.id=c.user_id and sp_id=?";
    let values= [
        req.params.id
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:sp_id/:user_id',(req,res)=>{
    let sql = "Select * From chat where sp_id=? and user_id=? ORDER BY id ASC";
    let values= [
        req.params.sp_id,
        req.params.user_id
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.get('/:id',(req,res)=>{
    let sql = "Select *,s.id as 'service_id' From service s,users u where u.id=s.user_id and u.id=?";
    let values= [
        req.params.id
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    
    let sql = "insert into chat(date_time,msg,sp_id,user_id,send) values ?";
    var newRecord= [[
        req.body.date_time,
        req.body.msg,
        req.body.sp_id,
        req.body.user_id,
        req.body.send,
    ]]

    db.query(sql, [newRecord] ,(err,results)=>{
        if(!err){
            res.send(JSON.stringify(results[0]))
        }else{
            res.send(JSON.stringify({"err":"error"}))
        }
    })
})

module.exports = router