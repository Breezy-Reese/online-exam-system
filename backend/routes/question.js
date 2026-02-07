const express = require('express');
const { createQuestion, getQuestions, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const { auth, roleAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, roleAuth(['teacher']), createQuestion);
router.get('/:examId', auth, getQuestions);
router.put('/:id', auth, roleAuth(['teacher']), updateQuestion);
router.delete('/:id', auth, roleAuth(['teacher']), deleteQuestion);

module.exports = router;
