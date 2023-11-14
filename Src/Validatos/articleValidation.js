 const Joi = require('joi');

const articleValidation = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    publishDate: Joi.date().required(),
    content: Joi.string().required(),
    cover: Joi.string().uri().required(),
    isPublished: Joi.boolean().required(), 
});

module.exports = { articleValidation };
