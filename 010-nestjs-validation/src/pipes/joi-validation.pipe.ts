import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';
import {
    ObjectSchema
} from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    public transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(Object.assign({}, value));
        console.log('%cjoi-validation.pipe.ts line:10 error', 'color: #007acc;', error);
        console.log('%cjoi-validation.pipe.ts line:10 value', 'color: #007acc;', value);

        this.getError(error);

        return value;
    }

    private getError(error: any): void {
        if(error) {
            throw new BadRequestException({
                DETAILS: `${error.details[0].message}`,
                EN: 'validation error'
            });
        }
    }
}