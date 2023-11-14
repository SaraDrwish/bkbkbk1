const Joi = require('joi');

const examValidation = Joi.object({
    courseName: Joi.string().required(),
    date: Joi.date().required(),
    duration: Joi.string().required(),
    link: Joi.string().uri().required(),
});

const examMiddleware = {
    validateExam: (req, res, next) => {
        const { error } = examValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    },

 };

module.exports = examMiddleware;
