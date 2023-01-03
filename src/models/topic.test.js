const chai = require('chai');
const { describe, it, before } = require('mocha');
const chaiAsPromised = require('chai-as-promised');
const { faker } = require('@faker-js/faker');

const { expect } = chai;
const { connectToDb } = require('../utils/dbInit');
const Topic = require('./topic');

chai.use(chaiAsPromised);

describe('Topic testing suit', () => {
    before(async () => {
        await connectToDb();
    });

    it('should create a topic successfully', async () => {
        const topicData = {
            title: faker.name.jobTitle(),
            duration: faker.name.firstName(),
            courseId: faker.database.mongodbObjectId(),
        };
        const topicToSave = new Topic(topicData);
        const savedTopic = await topicToSave.save();
        expect(savedTopic).to.exist; // eslint-disable-line no-unused-expressions
        expect(savedTopic.title).to.be.equal(topicData.title);
    });

    it('should throw if title is missing', async () => {
        const topicData = {
            duration: faker.name.firstName(),
            courseId: faker.database.mongodbObjectId(),
        };

        const topicToSave = new Topic(topicData);
        await expect(topicToSave.save()).to.be.rejectedWith('title is required');
    });

    it('should throw if duration is missing', async () => {
        const topicData = {
            title: faker.name.jobTitle(),
            courseId: faker.database.mongodbObjectId(),
        };

        const topicToSave = new Topic(topicData);
        await expect(topicToSave.save()).to.be.rejectedWith('duration is required');
    });
});
