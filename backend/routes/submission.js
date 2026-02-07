const express = require('express');
const { submitExam, getResults, getAllSubmissions } = require('../controllers/submissionController');
const { auth, roleAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, roleAuth(['student']), submitExam);
router.get('/results', auth, roleAuth(['student']), getResults);
router.get('/:examId', auth, roleAuth(['teacher']), getAllSubmissions);

module.exports = router;
