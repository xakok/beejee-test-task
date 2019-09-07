import { Trim } from "class-sanitizer";
import { sanitize } from "class-sanitizer/class-sanitizer";
import { plainToClass } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Request } from "express";
import { getConnection } from "typeorm";
import Task from "../entity/Task";
import HttpError from "../util/http-error";
import validate from "../util/validate";

class BodyParams {
    @Trim()
    @IsNotEmpty()
    public username: string;

    @Trim()
    @IsEmail()
    public email: string;

    @Trim()
    @IsNotEmpty()
    public text: string;
}

export default async function createTask({ body }: Request) {
    const params = plainToClass(BodyParams, body);
    sanitize(params);
    const errors = validate(params);
    if (errors) {
        throw new HttpError(400, errors);
    }
    const task = new Task();
    task.username = params.username;
    task.email = params.email;
    task.text = params.text;
    await getConnection().getRepository(Task).insert(task);
    return task;
}
