import { validateSync, ValidatorOptions } from "class-validator";

export default function validate<T>(object: T, options?: ValidatorOptions): null | { [P in keyof T]?: string } {
    const errors = validateSync(object, options);
    if (!errors.length) {
        return null;
    }
    const result: any = {};
    errors.forEach(({ property, constraints }) => {
        result[property] = Object.values(constraints)[0];
    });
    return result;
}
