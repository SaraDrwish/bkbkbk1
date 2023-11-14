// articleRouter.js for Articles feature
const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');
const articleMiddleware = require('../Middleware/articleMiddleware');

router.post('/create', articleMiddleware.validateArticle, articleController.createArticle);
router.put('/update/:articleId', articleController.updateArticle);
router.delete('/delete/:articleId', articleController.deleteArticle);
router.get('/all', articleController.getAllArticles);
router.get('/:articleId', articleController.getArticleById);

module.exports = router;