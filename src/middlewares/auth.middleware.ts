// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../interface/custom.request';
import { UnAuthorizedException } from '../exception/UnAuthorizedException';
import { AuthService } from '../services/auth.service';

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (! token) {
        throw new UnAuthorizedException('Unauthorized: Token not provided')
    }

    try {
        const authService = new AuthService();
        (req as CustomRequest).user = await authService.verifyToken(token)

        next();
    } catch (error) {
        throw new UnAuthorizedException('Unauthorized: Invalid token')
    }
};