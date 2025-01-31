const Joi = require('joi');

const listingschema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .min(3)
        .max(30)
        .required(),
    image: Joi.string()
        .min(3)
        .max(30)
        .allow("",null),
    price: Joi.number()
        .integer()
        .min(0),
    location: Joi.string()
        .min(3)
        .max(30)
        .required(),
    country: Joi.string()
        .min(3)
        .max(30)
        .required()
});

module.exports = listingschema;
