import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const requireSignin = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const user = await userModel.findById(req.user.id);
        console.log(user);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Admin resource. Access denied'
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
}