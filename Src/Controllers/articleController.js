
const asynchandler = require('../Middleware/asynchandler');
const Article = require('../Models/articleModel');
const fileUploadService = require('../Services/fileUploadService');

const articleController = {
    createArticle: asynchandler(async (req, res) => {
        const { title, category, publishDate, content, isPublished } = req.body;
        const newArticle = new Article({ title, category, publishDate, content, isPublished });

        if (req.file) {
            const coverFileName = await fileUploadService.uploadFile(req.file);
            newArticle.cover = coverFileName;
        }

        const savedArticle = await newArticle.save();
        res.json(savedArticle);
    }),

    updateArticle: asynchandler(async (req, res) => {
        const { articleId } = req.params;
        const updatedFields = req.body;

        if (req.file) {
            const coverFileName = await fileUploadService.uploadFile(req.file);
            updatedFields.cover = coverFileName;
        }

        const updatedArticle = await Article.findByIdAndUpdate(articleId, updatedFields, { new: true });
        res.json(updatedArticle);
    }),

    deleteArticlePhoto: asynchandler(async (req, res) => {
        const { articleId } = req.params;
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        if (article.cover) {
            await fileUploadService.deleteFile(article.cover);
            article.cover = null;
            await article.save();
        }

        res.json({ message: 'Article cover deleted successfully' });
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

    
 updateArticleImage: asynchandler(async (req, res) => {
        const { articleId, imageIndex } = req.params;
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
     }
     


       if (req.file) {
            const updatedImageName = await fileUploadService.uploadFile(req.file);
            if (article.images && article.images.length > imageIndex) {
                // Delete the existing image
                await fileUploadService.deleteFile(article.images[imageIndex]);
                // Update the image in the array
                article.images[imageIndex] = updatedImageName;
            }
        }

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    }),

    deleteArticleImage: asynchandler(async (req, res) => {
        const { articleId, imageIndex } = req.params;
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        if (article.images && article.images.length > imageIndex) {
            const imageName = article.images[imageIndex];
            await fileUploadService.deleteFile(imageName);
            article.images.splice(imageIndex, 1);
            await article.save();
        }

        res.json({ message: 'Article image deleted successfully' });
    }),




};

module.exports = articleController;
