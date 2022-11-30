const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const serverConfig = config.get('Server');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const { connectToDb } = require('./utils/dbInit');
const logger = require('./utils/logger');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/post', postRoute);
app.get('/', (req, res) => {
    res.send('This is the home page of user');
});

app.listen(serverConfig.port, async () => {
    await connectToDb();
    logger.info(`server running on port ${serverConfig.port}`);
});
