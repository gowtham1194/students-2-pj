const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student2.model'); 
const app = express();
app.use(express.json());


mongoose.connect('mongodb+srv://sgowtham0181:uf8c3l2T14U4Voey@studentget.5lta1.mongodb.net/STUDENT-GET?retryWrites=true&w=majority&appName=studentget')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));



app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
});

app.post('/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add student' });
    }
});

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});
