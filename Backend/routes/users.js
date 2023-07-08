const express = require('express')
var router = express.Router()

const { db } = require('../db')

router.get('/',(req,res)=>{
    let sql = "Select * From users";
    db.query(sql,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(err)
        }
    })
})

router.post('/login',(req,res)=>{
    let sql = "Select * From users where email=?";
    let values= [
        req.body.email
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            if(results[0]){
                if(results[0]['password']==req.body.password){
                    if(results[0]['access']==1){
                        res.send(JSON.stringify(results[0]))
                    }else{
                        res.send(JSON.stringify({"err":"access"}))
                    }
                }else{
                    res.send(JSON.stringify({"err":"user_password"}))
                }
            }else{
                res.send(JSON.stringify({"err":"user_email"}))
            }
        }else{
            res.send(JSON.stringify({"err":"connection"}))
        }
    })
})

router.post('/',(req,res)=>{
    let sql = "Select * From users where email=?";
    let values= [
        req.body.email
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            console.log(results[0])
            if(!results[0]){
                let sql = "insert into users(name,nic,phone,email,password,address) values ?";
                var newRecord= [[
                    req.body.name,
                    req.body.nic,
                    req.body.phone,
                    req.body.email,
                    req.body.password,
                    req.body.address
                ]]

                db.query(sql, [newRecord] ,(err,results)=>{
                    if(!err){
                        res.send(results)
                    }else{
                        console.log(err)
                        res.send(JSON.stringify({"err":"data"}))
                    }
                })
            }else{
                console.log(err)
                res.send(JSON.stringify({"err":"email"}))
            }
        }else{
            console.log(err)
            res.send(JSON.stringify({"err":"connection"}))
        }
    })

})

router.put('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Update users SET access=?,userType=? where id=?";

    let record= [
            req.body.access,
            req.body.userType,
            req.params.id
        ]

    db.query(sql, record ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            res.send(JSON.stringify({"err":"data"}))
        }
    })

})

router.delete('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Delete from users where id=?";

    let record= [
        req.params.id
    ]

    db.query(sql, record ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(err)
        }
    })
})

module.exports = router