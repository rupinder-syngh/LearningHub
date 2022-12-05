const chai = require('chai');
const { describe, it, before } = require('mocha');
const chaiAsPromised = require('chai-as-promised');
const { faker } = require('@faker-js/faker');

const { expect } = chai;
const { connectToDb } = require('../utils/dbInit');
const Course = require('./course');

chai.use(chaiAsPromised);

describe('Course testing suit', () => {
    before(async () => {
        await connectToDb();
    });

    it('should create a Course successfully', async () => {
        const courseData = {
            title: faker.name.jobTitle(),
            description: faker.random.words(100),
            duration: faker.name.firstName(),
        };
        const courseToSave = new Course(courseData);
        const savedCourse = await courseToSave.save();
        expect(savedCourse).to.exist; // eslint-disable-line no-unused-expressions
        expect(savedCourse.title).to.be.equal(courseData.title);
    });

    it('should throw if title is missing', async () => {
        const courseData = {
            description: faker.random.words(100),
            duration: faker.name.firstName(),
        };

        const courseToSave = new Course(courseData);
        await expect(courseToSave.save()).to.be.rejectedWith('title is required');
    });

    it('should throw if course description is missing', async () => {
        const courseData = {
            title: faker.name.jobTitle(),
            duration: faker.name.firstName(),
        };

        const courseToSave = new Course(courseData);
        await expect(courseToSave.save()).to.be.rejectedWith('description is required');
    });

    it('should throw if duration is missing', async () => {
        const courseData = {
            title: faker.name.jobTitle(),
            description: faker.random.words(100),
        };

        const courseToSave = new Course(courseData);
        await expect(courseToSave.save()).to.be.rejectedWith('duration is required');
    });
});
