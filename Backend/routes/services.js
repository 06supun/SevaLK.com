const express = require('express')
var router = express.Router()
var multer = require('multer')
var uniqid = require('uniqid')

const { db } = require('../db')

router.get('/',(req,res)=>{
    let sql = "Select *,s.id as 'service_id' From service s,users u where u.id=s.user_id";
    db.query(sql,(err,results)=>{
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

router.get('/get/:id',(req,res)=>{
    let sql = "Select *,s.id as 'service_id' From service s,users u where u.id=s.user_id and s.id=?";
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
    let sql = "Select * From service where title=? and user_id=?";
    let values= [
        req.body.title,
        req.body.user_id,
    ]
    db.query(sql, values ,(err,results)=>{
        if(!err){
            if(!results[0]){
                let sql = "insert into service(title,price,location,photo,user_id) values ?";
                var newRecord= [[
                    req.body.title,
                    req.body.price,
                    req.body.location,
                    req.body.photo,
                    req.body.user_id
                ]]

                db.query(sql, [newRecord] ,(err,results)=>{
                    if(!err){
                        res.send(results)
                    }else{
                        console.log(JSON.stringify(err,undefined,2))
                    }
                })
            }else{
                res.send(JSON.stringify({"err":"already"}))
            }
        }else{
            console.log(JSON.stringify(err,undefined,2))
            res.send(JSON.stringify({"err":"connection"}))
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Update service SET title=?,price=?,location=?,photo=? where id=?";

    let record= [
        req.body.title,
        req.body.price,
        req.body.location,
        req.body.photo,
        req.params.id
    ]

    db.query(sql, record ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!req.params.id){
        return res.status(400).send(req.params.id)
    }

    let sql = "Delete from service where id=?";

    let record= [
        req.params.id
    ]

    db.query(sql, record ,(err,results)=>{
        if(!err){
            res.send(results)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})

module.exports = router