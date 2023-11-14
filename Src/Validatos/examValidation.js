const Joi = require('joi');

const examValidation = Joi.object({
    courseName: Joi.string().required(),
    date: Joi.date().required(),
    duration: Joi.string().required(),
    link: Joi.string().uri().required(), 
});

module.exports = { examValidation };