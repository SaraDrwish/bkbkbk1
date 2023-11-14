 const Joi = require('joi');

const articleValidation = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    publishDate: Joi.date().required(),
    content: Joi.string().required(),
    cover: Joi.string().uri().required(),
    isPublished: Joi.boolean().required(),
});

const articleMiddleware = {
    validateArticle: (req, res, next) => {
        const { error } = articleValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    },

 };

module.exports = articleMiddleware;