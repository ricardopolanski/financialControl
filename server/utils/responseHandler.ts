import { Response } from "express";

interface SucessResponse {
    message?: string;
    data?: any;
    [key: string]: any
}


const response = (
    res: Response,
    statusCode: number,
    payload: SucessResponse
): Response => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        ...payload
    });
};

export function sendSuccess (res: Response, message: SucessResponse) {
    return response(res, 200, message)
}

export function sendValidationError (res: Response, message: SucessResponse) {
    return response(res, 400, message)
}

export function sendUnauthorizedError (res: Response, message: SucessResponse) {
    return response(res, 401, message)
}

export function sendForbiddenError (res: Response, message: SucessResponse) {
    return response(res, 403, message)
}

export function sendNotFoundError (res: Response, message: SucessResponse) {
    return response(res, 404, message)
}

export function sendServerError  (res: Response, message: SucessResponse) {
    return response(res, 500, message)
}

