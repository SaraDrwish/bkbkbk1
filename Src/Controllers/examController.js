
// const examService = require('../Services/examService');

// const examController = {
//     createExam: async (req, res) => {
//         try {
//             const { courseName, date, duration, link } = req.body;
//             const newExam = await examService.createExam(courseName, date, duration, link);
//             res.status(201).json(newExam);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     updateExam: async (req, res) => {
//         try {
//             const { examId } = req.params;
//             const updatedFields = req.body;
//             const updatedExam = await examService.updateExam(examId, updatedFields);
//             res.status(200).json(updatedExam);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     deleteExam: async (req, res) => {
//         try {
//             const { examId } = req.params;
//             const deletedExam = await examService.deleteExam(examId);
//             res.status(200).json(deletedExam);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     getAllExams: async (req, res) => {
//         try {
//             const exams = await examService.getAllExams();
//             res.status(200).json(exams);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },

//     getExamById: async (req, res) => {
//         try {
//             const { examId } = req.params;
//             const exam = await examService.getExamById(examId);
//             if (exam) {
//                 res.status(200).json(exam);
//             } else {
//                 res.status(404).json({ message: 'Exam not found' });
//             }
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     },
// };

// module.exports = examController;



const asynchandler = require('../Middleware/asynchandler');
const Exam = require('../Models/examModel');
const fs = require('fs/promises');
const path = require('path');

const uploadDirectory = 'uploads/';

const examController = {
    createExam: asynchandler(async (req, res) => {
        const { courseName, date, duration, link } = req.body;
        const newExam = new Exam({ courseName, date, duration, link });

        if (req.file) {
            const photoFileName = req.file.filename;
            newExam.photo = photoFileName;
        }

        const savedExam = await newExam.save();
        res.json(savedExam);
    }),

    updateExam: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const updatedFields = req.body;

        if (req.file) {
            const photoFileName = req.file.filename;
            updatedFields.photo = photoFileName;
        }

        const updatedExam = await Exam.findByIdAndUpdate(examId, updatedFields, { new: true });
        res.json(updatedExam);
    }),

    deleteExamPhoto: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const exam = await Exam.findById(examId);

        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (exam.photo) {
            const photoPath = path.join(__dirname, '..', uploadDirectory, exam.photo);

            await fs.unlink(photoPath);

            exam.photo = null;
            await exam.save();
        }

        res.json({ message: 'Exam photo deleted successfully' });
    }),
 

    // ///////////////////


    createExam: asynchandler(async (req, res) => {
        const { courseName, date, duration, link } = req.body;
        const newExam = new Exam({ courseName, date, duration, link });
        const savedExam = await newExam.save();
        res.json(savedExam);
    }),

    updateExam: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const updatedFields = req.body;
        const updatedExam = await Exam.findByIdAndUpdate(examId, updatedFields, { new: true });
        res.json(updatedExam);
    }),

     getExamById: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json(exam);
    }),

    deleteExam: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const deletedExam = await Exam.findByIdAndDelete(examId);
        if (!deletedExam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted successfully' });
    }),

    getAllExams: asynchandler(async (req, res) => {
        const exams = await Exam.find();
        res.json(exams);
    }),


 };

module.exports = examController;

