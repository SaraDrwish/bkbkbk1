// const articleService = require('../services/articleService');
// const { articleValidation } = require('../validators/validationFunctions');

// const articleController = {
//     // Create a new article
//     createArticle: async (req, res) => {
//         try {
//             // Validate request body using Joi
//             const { error } = articleValidation.validate(req.body);
//             if (error) {
//                 return res.status(400).json({ error: error.details[0].message });
//             }

//             const { title, category, publishDate, content, cover } = req.body;
//             const newArticle = await articleService.createArticle(title, category, publishDate, content, cover);
//             res.status(201).json(newArticle);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     // Update an existing article by ID
//     updateArticle: async (req, res) => {
//         try {
//             const { articleId } = req.params;
//             const updatedFields = req.body;
//             const updatedArticle = await articleService.updateArticle(articleId, updatedFields);
//             res.status(200).json(updatedArticle);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     // Delete an article by ID
//     deleteArticle: async (req, res) => {
//         try {
//             const { articleId } = req.params;
//             const deletedArticle = await articleService.deleteArticle(articleId);
//             res.status(200).json(deletedArticle);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     // Get all articles
//     getAllArticles: async (req, res) => {
//         try {
//             const articles = await articleService.getAllArticles();
//             res.status(200).json(articles);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     // Get an article by ID
//     getArticleById: async (req, res) => {
//         try {
//             const { articleId } = req.params;
//             const article = await articleService.getArticleById(articleId);
//             if (article) {
//                 res.status(200).json(article);
//             } else {
//                 res.status(404).json({ message: 'Article not found' });
//             }
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     }
// };

// module.exports = articleController;



const asynchandler = require('../Middleware/asynchandler');
const Article = require('../Models/articleModel');

const articleController = {
    createArticle: asynchandler(async (req, res) => {
        const { title, category, publishDate, content, cover, isPublished } = req.body;
        const newArticle = new Article({ title, category, publishDate, content, cover, isPublished });
        const savedArticle = await newArticle.save();
        res.json(savedArticle);
    }),

    updateArticle: asynchandler(async (req, res) => {
        const { articleId } = req.params;
        const updatedFields = req.body;
        const updatedArticle = await Article.findByIdAndUpdate(articleId, updatedFields, { new: true });
        res.json(updatedArticle);
    }),

   getArticleById: asynchandler(async (req, res) => {
        const { articleId } = req.params;
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    }),

    deleteArticle: asynchandler(async (req, res) => {
        const { articleId } = req.params;
        const deletedArticle = await Article.findByIdAndDelete(articleId);
        if (!deletedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    }),

    getAllArticles: asynchandler(async (req, res) => {
        const articles = await Article.find();
        res.json(articles);
    }),
        
        };

module.exports = articleController;
