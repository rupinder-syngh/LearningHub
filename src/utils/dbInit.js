const { default: mongoose } = require('mongoose');
const config = require('config');

const dbConfig = config.get('Server.db');

const connectToDb = async () => {
    try {
        return await mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    connectToDb,
};
