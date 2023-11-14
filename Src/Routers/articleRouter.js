const express = require('express');
const articleValidator = require('../Middleware/articleValidator');
const articleController = require('../Controllers/articleController');

const router = express.Router();

 router.post('/articles', articleValidator.validateCreateArticle, articleController.createArticle);

 router.patch('/articles/:articleId', articleValidator.validateUpdateArticle, articleController.updateArticle);

module.exports = router;
