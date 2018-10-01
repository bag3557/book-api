import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import auth from './routes/auth';
import users from './routes/users';

dotenv.config();

const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true});

app.use('/api/auth', auth);
app.use('/api/users', users);

// app.post('/api/auth', (req, res) => {
//     const { credentials } = req.body;
    
//     User.findOne({ email: credentials.email }).then(user => {
//         if(user){

//         } else {
//             res.status(400).json({ errors: { global: "Invalid Credentials..." }})
//         }

//         //console.log(credentials);
//     });
    
//     // res.status(400).json({ errors: { global: 'Invalid Credentials...'}});
// })

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3002, () => console.log('Running on localhost:3002'))