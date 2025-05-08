import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,confirmPass} = await req.body;


    if(!name||!email||!password||!confirmPass){
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    if(password!==confirmPass){
        res.status(400);
        throw new Error('Passwords do not match');
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }




        const getSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,getSalt);

        try {
            const users = await User.create({name, email, password: hashedPassword});
            res.status(201).json({
                _id: users.id,
                name: users.name,
                email: users.email,
                password: users.password,
                Token: generateToken(users.id)
            });

        } catch (err) {
            res.status(400);
            throw new Error('Error in creating user');


    }
})


const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = await req.body;
    const user = await User.findOne({email});


    if(!user || !(await bcrypt.compare(password,user.password))){
        throw new Error("Email or password incorrect")
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
    });

})

const currentUser = asyncHandler(async(req,res)=>{
    const {id,name,email} = await User.findById(req.user.id);
    res.status(200).json({ id: _id, name, email })
})

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'24h'});
}

export {registerUser,loginUser,currentUser};