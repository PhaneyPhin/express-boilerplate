import { Request, Response } from "express";
import { NotFoundException } from "../exception/NotFoundException";
import { EntityNotFoundError } from "typeorm";
import HttpStatusCode from "../enums/httpStatus";
import { UnprocessableEntity } from "../exception/UnprocessableEntity";
import { UnAuthorizedException } from "../exception/UnAuthorizedException";

export function ErrorHandlingWrapper(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response) {
        try {
            return await originalMethod.call(this, req, res);
        } catch (e) {
            if (e instanceof NotFoundException || e instanceof EntityNotFoundError) {
                return res.status(HttpStatusCode.NOT_FOUND).send({
                    code: HttpStatusCode.NOT_FOUND,
                    message: e.message
                })
            }

            if (e instanceof UnprocessableEntity) {
                return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send({
                    code: HttpStatusCode.UNPROCESSABLE_ENTITY,
                    data: e.data,
                    message: 'Data provided is invalid'
                })
            }

            if (e instanceof UnAuthorizedException) {
                return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send({
                    code: HttpStatusCode.UNPROCESSABLE_ENTITY,
                    message: e.message
                })
            }

            console.error('[error] Unhandled error', e)

            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                code: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Internal server error'
            });
        }
    };

    return descriptor;
}
