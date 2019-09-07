import { ToInt, Trim } from "class-sanitizer";
import { sanitize } from "class-sanitizer/class-sanitizer";
import { plainToClass } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Request } from "express";
import { getConnection } from "typeorm";
import Task, { TaskStatus } from "../entity/Task";
import HttpError from "../util/http-error";
import validate from "../util/validate";

class BodyParams {
    @Trim()
    @IsNotEmpty()
    public text?: string;

    @ToInt()
    @IsEnum(TaskStatus)
    public status?: number;
}

export default async function editTask({ body, params: { id } }: Request) {
    const repo = await getConnection().getRepository(Task);
    const task = await repo.findOne(id);
    if (!task) {
        throw new HttpError(401);
    }
    const params = plainToClass(BodyParams, body);
    sanitize(params);
    const errors = validate(params, { skipMissingProperties: true });
    if (errors) {
        throw new HttpError(400, errors);
    }
    if (params.status != null) {
        task.status = params.status;
    }
    if (params.text != null) {
        task.text = params.text;
    }
    await repo.save(task);
    return task;
}
