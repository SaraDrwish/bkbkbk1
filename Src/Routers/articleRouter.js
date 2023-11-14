// const express = require('express');
// const router = express.Router();
// const articleController = require('../Controllers/articleController');
// const articleMiddleware = require('../Middleware/articleMiddleware');

// router.post('/create', articleMiddleware.validateArticle, articleController.createArticle);
// router.put('/update/:articleId', articleController.updateArticle);
// router.delete('/delete/:articleId', articleController.deleteArticle);
// router.get('/all', articleController.getAllArticles);
// router.get('/:articleId', articleController.getArticleById);

// module.exports = router;


const express = require('express');
const articleValidator = require('../Middleware/articleValidator');
const articleController = require('../Controllers/articleController');

const router = express.Router();

 router.post('/articles', articleValidator.validateCreateArticle, articleController.createArticle);

 router.patch('/articles/:articleId', articleValidator.validateUpdateArticle, articleController.updateArticle);

module.exports = router;
