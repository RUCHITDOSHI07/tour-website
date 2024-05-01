const express = require('express');
const router = express.Router();

//mogodb user
const User = require("../models/User");

//password handler
const bcrypt = require('bcrypt');

//signup
router.post('/signup',(req,res)=>{
    let{name,email,password,dateOfBirth}= req.body;
    name = name.trim();
    email = email.trim();
    password=password.trim();
    dateOfBirth = dateOfBirth.trim();

    if(name == "" || email=="" || password=="" || dateOfBirth=="" )
    {
        res.json({
            status:"Failed",
            message:"Empty input fields!"
        })
    }else if(!/^[a-zA-Z]*$/.test(name)){
        res.json({
            status:"Failed",
            message:"invalid name"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
    {
        res.json({
            status:"Failed",
            message:"Invalid email"
        })
    }else if(!new Date(dateOfBirth).getTime()) {
        res.json({
            status:"Failed",
            message:"Invalid date of birth"
        })
    }else if(password.length < 8){
        res.json({
            status: "failed",
            message: "Password should be at least 8 characters long."
        });
    } else {
        User.find({email}).then(result=>{
            if(result.length)
            {
                res.json({
                    status:"Failed",
                    message:"user already exists"
                })
            }else{
                //new user


                //password handler
                const saltRounds = 10;
                bcrypt.hash(password,saltRounds).then(hashedPassword=>
                {
                    const newuser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });
                    newuser.save().then(result=> {
                        res.json({
                            status: 'success',
                            message:"signup success",
                            data:result,
                        })
                    })
                    .catch(err=>{
                        res.json({
                            status:"Failed",
                            message:"Error"
                        })
                    })
                })
                .catch(err=>{
                    res.json({
                        status:"Failed",
                        message:"Error"
                    })
                })
            }

        }).catch(err=>{
            console.log(err);
            res.json({
                status : 'error',
                message : 'Something went wrong!'
            })
        })
    }

});

//signin
router.post( '/signin' , ( req , res ) => {

    let{email,password}= req.body;
    email = email.trim();
    password=password.trim();

    if( email=="" || password=="")
    {
        res.json({
            status:"Failed",
            message:"Empty input fields!"
        })
    }else{

        User.find({email}).then(data=>{
            if (data.length){
                //user exists

                const hashedPassword = data[0].password;
                bcrypt.compare(password , hashedPassword).then(result=>{
                    if(result)
                    {
                        res.json({
                            status:"success",
                            message:"signin successful",
                            data:data
                        })
                    }else{
                        res.json({
                            status:"failed",
                            message:"invalid password"
                        })
                    }
                })
                .catch(err=>{
                    res.json({
                        status:"failed",
                        message:"error"
                    })
                })
            }else {
                res.json({
                    status:"failed",
                    message:"error"
                })
            }
        }).catch(err=>{
            res.json({
                status:"failed",
                message:"error"
            })
        })

    }
});

module.exports=router;