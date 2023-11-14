// examRouter.js for Exams feature
const express = require('express');
const router = express.Router();
const examController = require('../Controllers/examController');
const examMiddleware = require('../Middleware/examMiddleware');

router.post('/create', examMiddleware.validateExam, examController.createExam);
router.put('/update/:examId', examController.updateExam);
router.delete('/delete/:examId', examController.deleteExam);
router.get('/all', examController.getAllExams);
router.get('/:examId', examController.getExamById);

module.exports = router;