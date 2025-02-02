const Joi = require('joi');

module.exports.listingschema = Joi.object({
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

module.exports.reviewSchema = Joi.object({
    rating : Joi.number().min(1).max(5).required(),
    comment: Joi.string().required()
})
