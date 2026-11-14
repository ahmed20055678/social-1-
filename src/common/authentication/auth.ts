import express, { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import authres from '../../module/auth/auth.res';
import redis from '../../DB/redis.connection';
import { ACCESS_TOKEN_SECRET } from '../../config/config';

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new Error('Token not exists');
        }

        const decoded = (require('jsonwebtoken')).verify(token, ACCESS_TOKEN_SECRET);

        console.log("Decoded ID:", decoded.id);

        const user = await authres.findUserById(decoded.id);

        console.log("Authentication Search:", user);
        if (!user) {
            throw new Error('User not found');
        }

        if (user?.changecredital  && user.changecredital.getTime() > decoded.iat * 1000) {
            throw new Error("token expier must login again");
        }

        if (await redis.ttl(`revoke-token::${user.id}::${decoded.jti}`) > 0) {
            throw new Error("invalid revoke-token");
        }

        req.user = user;
        req.decoded = decoded;

        next();
    } catch (err) {
        next(err);
    }
};

