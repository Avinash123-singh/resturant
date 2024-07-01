
const userModel = require("../models/userModel")
const bcrypt= require('bcryptjs')
const JWT =require('jsonwebtoken')



//REGISTER
const RegisterController= async(req,res)=>{
    try {
        const {username,email,password,phone,address,answer}=req.body
        //Validation
        if(!username || !email || !password || !phone || !address || !answer){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        //existing user 
        const existing=await userModel.findOne({email})
        if(existing){
            return res.status(500).send(({
                success:false,
                message:'email already registered,please login with another email id'
            }))
        }
        //Hashing Password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(password,salt)

        //create new user
        const user= await userModel.create({username,email,password:hashPassword,phone,address,answer})
        console.log(`${user},Successfully Registered`);
         res.status(201).send({
            success:true,
            message:'Successfully Registered'
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registered API ',
            error
        })
    }
}
//login 
const loginController = async(req,res)=>{
    try {
        const {email,password}= req.body
        //validation
       if(!email ||!password){
        return res.status(500).send({
            success:false,
            message:"Please Provide Email And Password "
        })
       }
       //Check User 
       const user = await userModel.findOne({email})
       if(!user){
        res.status(500).send({
            success:false,
            message:"User Not Found"
        })

       }
       //CHECK USER PASSWORD || COMPARE PASSWORD

       const isMatch= await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.status(500).send({
            success:false,
            message:"Invalid Credentials"
        })
       }

       //TOKEN
       const token= JWT.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'7d',
       })
       user.password = undefined

       res.status(200).send({
        sucess:true,
        message:"Login Successfully",
        token
       })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}
module.exports = {RegisterController,loginController}