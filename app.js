const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');


const mongoUrl = config.MONGODB_URL;
//console.log(mongoUrl);
console.log('Connecting to MongoDB....')
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB')
    });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;