import express, { type NextFunction, type Request, type Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import authService from './auth.servsi';
import { IGoogleUser, IUser } from '../../DB/model/user.model';
import { HydratedDocument } from 'mongoose';
import {Hash} from "../../common/hash/hash";

const client = new OAuth2Client();

class authcontroller {
    constructor() { }

    singup=async ( req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password, fName, lName, gender, role, isConfirmed, phone, profileImage}:IUser = req.body
            if (!password) {
                throw new Error("password is required")
            }
            const user: HydratedDocument<IUser> = await authService.singup({email, password:await Hash(password), fName, lName, gender, role, isConfirmed, phone, profileImage})
            res.status(200).json({
                message: "signup successful",
                data: user
            })
        }
        catch (error)
        {
            next(error)
        }
    }
    singin=async ( req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password}: { email: string; password: string } = req.body
            const user = await authService.singin({ email, password });
            res.status(200).json({
                message: "signin successful",
                token:{
                    accessToken:user.accessToken,
                    refreshToken:user.refreshToken
                }
            })
        }
        catch (error)
        {
            next(error)
        }
    }
    getProfile=async ( req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if(!token){
                throw new Error("token not send")
            }
            const user = await authService.getProfile(token);
            res.status(200).json({
                message: "profile retrieved successfully",
                data: user
            })
        }
        catch (error)
        {
            next(error)
        }
    }
    
signupeWithGmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { idToken } = req.body;

        const decode = await client.verifyIdToken({
            idToken,
            audience: "419188861713-6pj8ssf3cfb8e37o94mqfm07uj5hfok9.apps.googleusercontent.com",
        });

        const payload = decode.getPayload();

        if (!payload) {
            throw new Error("Invalid Google Token");
        }

        const {
            email,
            given_name,
            family_name,
            picture,
            email_verified
        } = payload;

        if (!email || !given_name || !family_name || !email_verified) {
            throw new Error("Google account data is incomplete");
        }

        const user = await authService.signupeWithGmail(
            {
                email,
                given_name,
                family_name,
                picture: picture || "",
                email_verified
            },
            idToken
        );

        return res.status(201).json({
            message: "Signup successful",
            data: user
        });

    } catch (err) {
        next(err);
    }
};
refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log("HEADERS:", req.headers);
        console.log("TOKEN:", req.headers.token);
        const token = req.headers.token
        console.log(req.headers);
        if(typeof token !== "string"){
                throw new Error("token not send")
            }
        const user=await authService.refreshToken(token)
        
        res.json({
            message:"user signin",
            accessToken:user.accessToken
        })
    }catch(err){
        next(err)
    }
}

forgetPassword= async (req: Request, res: Response, next: NextFunction) => {
    try{
        const{email}=req.body
        const user=await authService.forgetPassword(email)
        res.json({
            message:"done",
            
        })
    }catch(err){
        next(err)
    }
}

reseatPassword=async (req: Request, res: Response, next: NextFunction) => {
    try{

        const{email,code,password,Cpassword}=req.body
        const user=await authService.reseatPassword(email,code,password,Cpassword)
        res.json({
            message:"done",
            
        })
    }catch(err){
        next(err)
    }
}

}


export default new authcontroller()