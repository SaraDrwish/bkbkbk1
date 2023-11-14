
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
