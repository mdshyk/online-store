const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(con => {
    console.log('DB connection successful!');
});

const port = process.env.PORT || 5000;
app.listen (port, () => {
    console.log(`App running on port ${port}`);
});
