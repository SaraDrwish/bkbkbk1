// const Article = require('../models/articleModel');

// const articleService = {
//     createArticle: async (title, category, publishDate, content, cover) => {
//         try {
//             const newArticle = new Article({ title, category, publishDate, content, cover });
//             return await newArticle.save();
//         } catch (err) {
//             throw new Error('Could not create article');
//         }
//     },

//     // Update an existing article by ID
//     updateArticle: async (articleId, updatedFields) => {
//         try {
//             // Assuming updatedFields is an object containing the fields to update
//             return await Article.findByIdAndUpdate(articleId, updatedFields, { new: true });
//         } catch (err) {
//             throw new Error('Could not update article');
//         }
//     },

//     // Delete an article by ID
//     deleteArticle: async (articleId) => {
//         try {
//             return await Article.findByIdAndDelete(articleId);
//         } catch (err) {
//             throw new Error('Could not delete article');
//         }
//     },

//     // Get all articles
//     getAllArticles: async () => {
//         try {
//             return await Article.find();
//         } catch (err) {
//             throw new Error('Could not get all articles');
//         }
//     },

//     // Get an article by ID
//     getArticleById: async (articleId) => {
//         try {
//             return await Article.findById(articleId);
//         } catch (err) {
//             throw new Error('Could not get article by ID');
//         }
//     }
// };

// module.exports = articleService;


// /////////////////////////////////////////////////////////

const Article = require('../Models/articleModel');

const articleService = {
    createArticle: async (title, category, publishDate, content, cover, isPublished) => {
        try {
            const newArticle = new Article({ title, category, publishDate, content, cover, isPublished });
            return await newArticle.save();
        } catch (err) {
            throw new Error('Could not create article');
        }
    },

    updateArticle: async (articleId, updatedFields) => {
        try {
            return await Article.findByIdAndUpdate(articleId, updatedFields, { new: true });
        } catch (err) {
            throw new Error('Could not update article');
        }
    },

    deleteArticle: async (articleId) => {
        try {
            return await Article.findByIdAndDelete(articleId);
        } catch (err) {
            throw new Error('Could not delete article');
        }
    },

    getAllArticles: async () => {
        try {
            return await Article.find();
        } catch (err) {
            throw new Error('Could not get all articles');
        }
    },

    getArticleById: async (articleId) => {
        try {
            return await Article.findById(articleId);
        } catch (err) {
            throw new Error('Could not get article by ID');
        }
    }
};

module.exports = articleService;



