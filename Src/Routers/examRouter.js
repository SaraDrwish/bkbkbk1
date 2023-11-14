const express = require('express');
const multer = require('multer');
const examValidator = require('../Middleware/examValidator');
const examController = require('../Controllers/examController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/exams', upload.single('photo'), examValidator.validateCreateExam, examController.createExam);

router.patch('/exams/:examId', upload.single('photo'), examValidator.validateUpdateExam, examController.updateExam);

router.delete('/exams/:examId/photo', examController.deleteExamPhoto);


module.exports = router;

