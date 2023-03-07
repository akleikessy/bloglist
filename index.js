const express = require('express');

const app = express();

const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Blog = mongoose.model('Blog', blogSchema);



const mongoUrl = process.env.MONGODB_URL;
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

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});


const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
