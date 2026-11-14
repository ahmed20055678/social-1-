
import { IGoogleUser, IUser } from "../../DB/model/user.model";
import authRes from "./auth.res";
import {CompareHash, Hash} from "../../common/hash/hash";
import { AppError } from "../../common/utills/globalError";
import {randomUUID} from "crypto";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config/config";
import redis from "../../DB/redis.connection";
import { generateOtp, sendEmail } from "../../common/sendEmail/sendEmail";
import eventEmaitter from "../../common/sendEmail/event";
import { providerEnum, RoleEnum } from "../../common/enums/enums";
class authService {

    constructor() { }

    singup = async ({ email, password, fName, lName, gender, role, isConfirmed, phone, profileImage }: IUser) => {

        const user = await authRes.findUserByEmail(email);

        if (user) {
            throw new Error("user already exists");
        }

        const newUser = await authRes.createUser({
            email,
            password,
            fName,
            lName,
            gender,
            role,
            isConfirmed:true,
            phone,
            profileImage
        });

        if (!newUser) {
            throw new Error("Failed to create user");
        }
    const otp = await generateOtp();
    const otpHash = await Hash(otp);
    await redis.setValue({
        key: `otp:${email}`,
        value: otpHash,
        ttl: 60 * 5
    });
    eventEmaitter.emit("confirm-email",async()=>{
        await sendEmail({
            to: email,
            subject: "Confirm Email",
            html: `<h1>otp:${otp}</h1>`
        });
    })
    await redis.setValue({
        key: `otp::max::${email}`,
        value: 1,
        ttl: 60 * 7
    });
 

        return newUser;
    }
    singin = async ({ email, password }: { email: string; password: string }) => {
        const user = await authRes.findUserByEmail( email);  
        if (!user) {
            throw new Error("user not found");
        }
        if (!user.password || !await CompareHash(password, user.password)) {
            throw new AppError("incorrect password", 401);
        }
        const token = randomUUID();
        const accessToken = jwt.sign({ id: user._id,email:user.email }, ACCESS_TOKEN_SECRET , { expiresIn:60*2,
        notBefore:0,
        jwtid:token });
        const refreshToken = jwt.sign({ id: user._id,email:user.email }, REFRESH_TOKEN_SECRET , { expiresIn:60*60 });
        return { user, accessToken, refreshToken };
    } 

    getProfile=async(token: string)=>{
    
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;

    const user=await authRes.findUserByEmail(decoded.email)
    if(!user){
        throw new Error("user not found")
    }
    return decoded
}
signupeWithGmail=async(data: IGoogleUser,idToken: any)=>{
    let user=await authRes.findUserByEmail(data.email)
    if(!user){
        user= await authRes.createUser({
            email:data.email,
            fName:data.given_name,
            lName:data.family_name,
            profileImage:data.picture,
            isConfirmed:data.email_verified,
            role:RoleEnum.user,
            provider:providerEnum.google
        })
        if(user.provider=="system"){
            throw new Error("user already exiest")
        }
        const accessToken=jwt.sign({id:user._id,email:user.email},"ACCESS_TOKEN_SECRET",{
        expiresIn:60*2,
        notBefore:30,
        
        })
        const refreshToken=jwt.sign({id:user._id,email:user.email},"REFRESH_TOKEN_SECRET")
    }
    return {user}
    }
    
refreshToken = async (token: string) => {
    if (!token) {
        throw new Error("token not send");
    }

    const decode = jwt.verify(
        token,
        REFRESH_TOKEN_SECRET
    ) as jwt.JwtPayload;

    const user = await authRes.findUserByEmail(decode.email);

    if (!user) {
        throw new Error("user not found");
    }

    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: 60 * 2
        }
    );

    return { decode, accessToken };
};
forgetPassword=async(email: string)=>{

    const blocked_ttl=await redis.ttl(`otp::block::${email}`)
    if(blocked_ttl>0){
        throw new Error(`you block you can resend otp after ${blocked_ttl}` )
    }
    const otpTti=await redis.ttl(`otp:${email}`)
    if(otpTti>0){
        throw new Error(`you can resend otp after ${otpTti}` )
    }
    const maxOtp=await redis.getValue(`otp::max::${email}`)
    if (maxOtp as number >=5){
        await redis.setValue({
            key: `otp::block::${email}`,
            value: "1",
            ttl: 60 * 10
        })
        throw new Error(`you have excuded the maximum number of tries` )
    }

    const user=await authRes.findUserByEmail(email,{isConfirmed:true})
    if(!user){
        throw new Error("user not exiest or isConfirmed")
    }
    const otp = await generateOtp();
    const otpHash = await Hash(otp);
    await redis.setValue({
        key: `otp:${email}`,
        value: otpHash,
        ttl: 60 * 5
    });
    eventEmaitter.emit("confirm-email",async()=>{
        await sendEmail({
            to: email,
            subject: "Confirm Email",
            html: `<h1>otp:${otp}</h1>`
        });
    })
    
return await redis.incr(`otp::max::${email}`)

}

reseatPassword=async(email: string,code: string,password: string,Cpassword: string)=>{

    const otp = await redis.getValue(`otp:${email}`);

    if(!otp){
        throw new Error('otp expiar')
    }
    if(! await CompareHash(code,otp as string)){
        throw new Error('invaled otp')
    }
    const user=await authRes.updateUserByEmail(email,{password:await Hash(password),changecredital:new Date()})
    if (!user){
        throw new Error("user not exiest or isConfirmed")
    }
    return await redis.deleteKey(`otp:${email}`)
}

}
export default new authService();
