import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPager = (model: any) => {
    const decorators = [
        ApiExtraModels(model),
        ApiResponse({
            schema: {
                allOf: [
                    {
                        properties: {
                            content: {
                                type: 'array',
                                items: {
                                    $ref: getSchemaPath(model),
                                },
                            },
                            total: {
                                type: 'number',
                                default: 0,
                            },
                        },
                    },
                ],
            },
        }),
    ];

    return applyDecorators(...decorators);
};
