import express, { type Response } from "express";

express.response.success = function (
    this: Response,
    statusCode: number,
    data?: unknown
) {
    return this.status(statusCode).json({
        success: true,
        data,
    });
};