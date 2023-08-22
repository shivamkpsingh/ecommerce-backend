import userModel from '../models/userModel.js';
import { hashPasswords, comparePassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone,address, roll} = req.body;
        if(!name) {
            return res.send({error: 'Name is required'});
        }
        if(!email) {
            return res.send({error: 'Email is required'});
        }
        if(!password) {
            return res.send({error: 'Password is required'});
        }
        if(!phone) {
            return res.send({error: 'Phone is required'});
        }
        if(!address) {
            return res.send({error: 'Address is required'});
        }

        // check existing user
        const existinguser = await userModel.findOne({email});
        if(existinguser) {
            return res.status(200).send({
                success:true,
                message: 'User already exist please login',
            })
        }

        // hash password
        console.log('YESS');
        const hashPassword = await hashPasswords(password);

        // create new user
        const user = await new userModel({name,email,phone,address,password: hashPassword}).save()
        res.status(201).send({
            success: true,
            message: 'User Resister successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error:error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        // check existing user
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }
        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: 'User login successfully',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error:error
        })
    }
}

//test

export const testController =  (req, res) => {
    res.send('test');
} 