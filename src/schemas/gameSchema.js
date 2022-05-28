import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().pattern(/^(?:http(s)?:\/\/)?/).required(),
    stockTotal: joi.number().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required()
});

export default gameSchema;