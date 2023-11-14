 
const examService = require('../Services/examService');

const examController = {
    createExam: async (req, res) => {
        try {
            const { courseName, date, duration, link } = req.body;
            const newExam = await examService.createExam(courseName, date, duration, link);
            res.status(201).json(newExam);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateExam: async (req, res) => {
        try {
            const { examId } = req.params;
            const updatedFields = req.body;
            const updatedExam = await examService.updateExam(examId, updatedFields);
            res.status(200).json(updatedExam);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteExam: async (req, res) => {
        try {
            const { examId } = req.params;
            const deletedExam = await examService.deleteExam(examId);
            res.status(200).json(deletedExam);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllExams: async (req, res) => {
        try {
            const exams = await examService.getAllExams();
            res.status(200).json(exams);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getExamById: async (req, res) => {
        try {
            const { examId } = req.params;
            const exam = await examService.getExamById(examId);
            if (exam) {
                res.status(200).json(exam);
            } else {
                res.status(404).json({ message: 'Exam not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = examController;
