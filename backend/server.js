const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')

require('dotenv').config();

const app = express();
// for sockets:
// const http = require('http').createServer(app);
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const cakesRouter = require('./routes/cakes');
const usersRouter = require('./routes/users');

app.use('/cakes', cakesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// if (process.env.NODE_ENV === 'production') {
//     // Exprees will serve up production assets
//     // app.use(express.static('client/build'));
//     app.use(express.static('public'));

//     // Express serve up index.html file if it doesn't recognize route
//     const path = require('path');
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5000', 'http://localhost:5000', 'http://127.0.0.1:5050', 'http://localhost:5050'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
