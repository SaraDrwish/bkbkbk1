const Exam = require('../models/examModel');

const examService = {
    createExam: async (courseName, date, duration, link) => {
        try {
            const newExam = new Exam({ courseName, date, duration, link });
            const savedExam = await newExam.save();
            return savedExam;
        } catch (err) {
            throw new Error('Could not create exam');
        }
    },

    updateExam: async (examId, updatedFields) => {
        try {
            const updatedExam = await Exam.findByIdAndUpdate(examId, updatedFields, { new: true });
            return updatedExam;
        } catch (err) {
            throw new Error('Could not update exam');
        }
    },

    deleteExam: async (examId) => {
        try {
            const deletedExam = await Exam.findByIdAndDelete(examId);
            return deletedExam;
        } catch (err) {
            throw new Error('Could not delete exam');
        }
    },

    getAllExams: async () => {
        try {
            const exams = await Exam.find();
            return exams;
        } catch (err) {
            throw new Error('Could not get all exams');
        }
    },

    getExamById: async (examId) => {
        try {
            const exam = await Exam.findById(examId);
            return exam;
        } catch (err) {
            throw new Error('Could not get exam by ID');
        }
    }
};

module.exports = examService;
