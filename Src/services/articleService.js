 const Article = require('../Models/articleModel');

const articleService = {
    createArticle: (title, category, publishDate, content, cover, isPublished) => {
        try {
            const newArticle = new Article({ title, category, publishDate, content, cover, isPublished });
            return newArticle.saveSync();  
        } catch (err) {
            throw new Error('Could not create article');
        }
    },

    updateArticle: (articleId, updatedFields) => {
        try {
            return Article.findByIdAndUpdateSync(articleId, updatedFields, { new: true });    
        } catch (err) {
            throw new Error('Could not update article');
        }
    },

    deleteArticle: (articleId) => {
        try {
            return Article.findByIdAndDeleteSync(articleId); 
        } catch (err) {
            throw new Error('Could not delete article');
        }
    },

    getAllArticles: () => {
        try {
            return Article.findSync(); 
        } catch (err) {
            throw new Error('Could not get all articles');
        }
    },

    getArticleById: (articleId) => {
        try {
            return Article.findByIdSync(articleId);  
        } catch (err) {
            throw new Error('Could not get article by ID');
        }
    }
};

module.exports = articleService;
