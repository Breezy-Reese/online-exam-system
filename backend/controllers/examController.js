const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.createExam = async (req, res) => {
  try {
    const exam = new Exam({ ...req.body, teacher: req.user._id });
    await exam.save();
    res.status(201).send(exam);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ teacher: req.user._id }).populate('questions');
    res.send(exams);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({ isActive: true }).populate('teacher', 'name');
    res.send(exams);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndUpdate(
      { _id: req.params.id, teacher: req.user._id },
      req.body,
      { new: true }
    );
    if (!exam) return res.status(404).send({ error: 'Exam not found' });
    res.send(exam);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndDelete({ _id: req.params.id, teacher: req.user._id });
    if (!exam) return res.status(404).send({ error: 'Exam not found' });
    res.send({ message: 'Exam deleted' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
