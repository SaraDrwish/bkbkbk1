 
const asynchandler = require('../Middleware/asynchandler');
const Exam = require('../Models/examModel');
const fileUploadService = require('../Services/fileUploadService');
const uploadDirectory = 'uploads/';

const examController = {
    createExam: asynchandler(async (req, res) => {
        const { courseName, date, duration, link } = req.body;
        const newExam = new Exam({ courseName, date, duration, link });

        if (req.file) {
            const photoFileName = await fileUploadService.uploadFile(req.file);
            newExam.photo = photoFileName;
        }

        const savedExam = await newExam.save();
        res.json(savedExam);
    }),

    updateExam: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const updatedFields = req.body;

        if (req.file) {
            const photoFileName = await fileUploadService.uploadFile(req.file);
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
            await fileUploadService.deleteFile(exam.photo);
            exam.photo = null;
            await exam.save();
        }

        res.json({ message: 'Exam photo deleted successfully' });
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


     updateExamPhoto: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const exam = await Exam.findById(examId);

        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (req.file) {
            const updatedPhotoName = await fileUploadService.uploadFile(req.file);
            if (exam.photo) {
                await fileUploadService.deleteFile(exam.photo);
            }
            exam.photo = updatedPhotoName;
        }

        const updatedExam = await exam.save();
        res.json(updatedExam);
    }),

    deleteExamPhoto: asynchandler(async (req, res) => {
        const { examId } = req.params;
        const exam = await Exam.findById(examId);

        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (exam.photo) {
            await fileUploadService.deleteFile(exam.photo);
            exam.photo = null;
            await exam.save();
        }

        res.json({ message: 'Exam photo deleted successfully' });
    }),



 };

module.exports = examController;

