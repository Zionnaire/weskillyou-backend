const express = require('express')
const role = require('../models/role')
const router = express.Router()

router.post('/', async(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.json({
            "message":"request cant be empty"
        })
    }
    let newRole = await role.create({name})
    return res.json({
        "msg":"New role created"
    })
})

router.get('/', async(req,res)=>{
    let roles = await role.find({})
    return res.json({
        roles
    })
})

module.exports = router