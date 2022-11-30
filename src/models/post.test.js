const chai = require('chai');
const { describe, it, before } = require('mocha');
const chaiAsPromised = require('chai-as-promised');
const { faker } = require('@faker-js/faker');

const { expect } = chai;
const { connectToDb } = require('../utils/dbInit');
const Post = require('./post');

chai.use(chaiAsPromised);

describe('post testing suit', () => {
    before(async () => {
        await connectToDb();
    });

    it('should create a post successfully', async () => {
        const postData = {
            title: faker.name.jobTitle(),
            body: faker.random.words(1000),
            author: faker.database.mongodbObjectId(),
        };
        const postToSave = new Post(postData);
        const savedPost = await postToSave.save();
        expect(savedPost).to.exist; // eslint-disable-line no-unused-expressions
        expect(savedPost.firstName).to.be.equal(postData.firstName);
    });

    it('should throw if title is missing', async () => {
        const postData = {
            body: faker.name.jobDescriptor(),
            author: faker.database.mongodbObjectId(),
        };

        const postToSave = new Post(postData);
        await expect(postToSave.save()).to.be.rejectedWith('title is required');
    });

    it('should throw if post content is missing', async () => {
        const postData = {
            title: faker.name.jobTitle(),
            author: faker.database.mongodbObjectId(),
        };

        const postToSave = new Post(postData);
        await expect(postToSave.save()).to.be.rejectedWith('body is required');
    });

    it('should throw if author is missing', async () => {
        const postData = {
            title: faker.name.jobTitle(),
            body: faker.name.jobDescriptor(),
        };

        const postToSave = new Post(postData);
        await expect(postToSave.save()).to.be.rejectedWith('author is required');
    });
});
