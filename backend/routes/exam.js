const express = require('express');
const { createExam, getExams, getAllExams, updateExam, deleteExam } = require('../controllers/examController');
const { auth, roleAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, roleAuth(['teacher']), createExam);
router.get('/teacher', auth, roleAuth(['teacher']), getExams);
router.get('/', auth, getAllExams);
router.put('/:id', auth, roleAuth(['teacher']), updateExam);
router.delete('/:id', auth, roleAuth(['teacher']), deleteExam);

module.exports = router;
