const Joi = require('joi');

const examValidator = {
    validateCreateExam: (req, res, next) => {
        const schema = Joi.object({
            courseName: Joi.string().required(),
            date: Joi.date().required(),
            duration: Joi.number().positive().required(),
            link: Joi.string().uri().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    },

    validateUpdateExam: (req, res, next) => {
        const schema = Joi.object({
            courseName: Joi.string(),
            date: Joi.date(),
            duration: Joi.number().positive(),
            link: Joi.string().uri()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    }
};

module.exports = examValidator;