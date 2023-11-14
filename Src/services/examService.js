const Exam = require('../Models/examModel');

const examService = {
    createExam: (courseName, date, duration, link) => {
        try {
            const newExam = new Exam({ courseName, date, duration, link });
            return newExam.saveSync();  
        } catch (err) {
            throw new Error('Could not create exam');
        }
    },

    updateExam: (examId, updatedFields) => {
        try {
            return Exam.findByIdAndUpdateSync(examId, updatedFields, { new: true });  
        } catch (err) {
            throw new Error('Could not update exam');
        }
    },

    deleteExam: (examId) => {
        try {
            return Exam.findByIdAndDeleteSync(examId);  
        } catch (err) {
            throw new Error('Could not delete exam');
        }
    },

    getAllExams: () => {
        try {
            return Exam.findSync();  
        } catch (err) {
            throw new Error('Could not get all exams');
        }
    },

    getExamById: (examId) => {
        try {
            return Exam.findByIdSync(examId);  
        } catch (err) {
            throw new Error('Could not get exam by ID');
        }
    }
};

module.exports = examService;
