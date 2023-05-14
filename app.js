const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const bodyParser = require('body-parser')
let Users = require('./models/users')
let rolesRouter = require('./routes/role')

let app = express()
app.use(cors())
app.use(express.json())
app.use('/roles',rolesRouter)

app.post('/register', async(req, res) => {
    const {username, email, password, cPassword, role} = req.body

     //Validation
    //  req.checkBody('email', 'Email is required').notEmpty();
    //  req.checkBody('email', 'Email is not valid').isEmail();
    //  req.checkBody('username', 'Username is required').notEmpty();
    //  req.checkBody('password', 'Password is required').notEmpty();
    //  req.checkBody('cPassword', 'Passwords do not match').equals(req.body.password);

    let usernameExist = await Users.findOne({username}) 
    let userExist = await Users.findOne({email})
    if(userExist){
        return res.json({
            "message": "User with this Email already exist"
        })
    }
   
    if(password !== cPassword){
        return res.json({
            "message": "Confirm Password has to match Password"
        })
    }

    let hashPassword = await bcrypt.hash(password, 10)

    let newUser = await Users.create({
        username,
        email,
        password:hashPassword,
        role:role
    })
    return res.json({
        message: `User ${username} has been registered. Congratulations`,
        username: newUser.username,
        email: newUser.email,
        role:newUser.role

    })
} )

app.post('/login',async(req,res)=>{
    const {username, password}= req.body

    let user = await Users.findOne({
        username
    })
    if(!user || user== undefined || user == null){
        return res.json({
            "message":"No user with this username"
        })
    }
    let decryptPass = await bcrypt.compare(password,user.password)
    if(!decryptPass){
            return res.json({
                "message":"Incorrect Password"
        })
    }
    return res.json({
        "message":"Succesfully logged in"
    })
})


module.exports = app