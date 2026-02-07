const Submission = require('../models/Submission');
const Question = require('../models/Question');
const Exam = require('../models/Exam');

exports.submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) return res.status(404).send({ error: 'Exam not found' });

    let score = 0;
    const processedAnswers = answers.map(answer => {
      const question = exam.questions.find(q => q._id.toString() === answer.question);
      if (question && answer.answer === question.correctAnswer) {
        score += question.marks;
      }
      return { question: answer.question, answer: answer.answer };
    });

    const submission = new Submission({
      student: req.user._id,
      exam: examId,
      answers: processedAnswers,
      score
    });
    await submission.save();
    res.status(201).send(submission);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id }).populate('exam', 'title');
    res.send(submissions);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ exam: req.params.examId }).populate('student', 'name').populate('exam', 'title');
    res.send(submissions);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
