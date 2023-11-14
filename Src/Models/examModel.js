const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    courseName: String,
    date: Date,
    duration: String,
    link: String
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;