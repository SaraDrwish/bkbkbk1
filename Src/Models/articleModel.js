const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    category: String,
    publishDate: Date,
    content: String,
    cover: String,
    isPublished: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;