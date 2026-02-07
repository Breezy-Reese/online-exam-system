const Question = require('../models/Question');
const Exam = require('../models/Exam');

exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    await Exam.findByIdAndUpdate(req.body.exam, { $push: { questions: question._id } });
    res.status(201).send(question);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ exam: req.params.examId });
    res.send(questions);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).send({ error: 'Question not found' });
    res.send(question);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).send({ error: 'Question not found' });
    await Exam.findByIdAndUpdate(question.exam, { $pull: { questions: question._id } });
    res.send({ message: 'Question deleted' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
