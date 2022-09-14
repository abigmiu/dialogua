import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
class IsIncludeBlankConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (typeof value === 'string') {
            return !/\s+/.test(value);
        }
        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} 不能包含空格`;
    }
}

export function IsIncludeBlank(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsIncludeBlankConstraint,
        });
    };
}
