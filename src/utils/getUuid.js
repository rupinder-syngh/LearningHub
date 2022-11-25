const { v4: uuidv4 } = require('uuid');

const getUuid = async () => {
    try {
        return uuidv4();
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = getUuid;
