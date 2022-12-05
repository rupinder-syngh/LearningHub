const chai = require('chai');
const { describe, it, before } = require('mocha');
const chaiAsPromised = require('chai-as-promised');
const { faker } = require('@faker-js/faker');

const { expect } = chai;
const { connectToDb } = require('../utils/dbInit');
const User = require('./user');

chai.use(chaiAsPromised);

describe('User testing suit', () => {
    before(async () => {
        await connectToDb();
    });

    it('should create a user successfully ', async () => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
        const userToSave = new User(userData);
        const saveduser = await userToSave.save();
        expect(saveduser).to.exist; // eslint-disable-line no-unused-expressions
        expect(saveduser.firstName).to.be.equal(userData.firstName);
    });

    it('should throw if firstName is missing', async () => {
        const userData = {
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const userToSave = new User(userData);
        await expect(userToSave.save()).to.be.rejectedWith('firstName is required');
    });

    it('should throw if email is missing', async () => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.internet.password(),
        };

        const userToSave = new User(userData);
        await expect(userToSave.save()).to.be.rejectedWith('email is required');
    });

    it('should throw if password is missing', async () => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
        };

        const userToSave = new User(userData);
        await expect(userToSave.save()).to.be.rejectedWith('password is required');
    });

    it('should throw if email is duplicate', async () => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const userToSave1 = new User(userData);
        const userToSave2 = new User(userData);
        await userToSave1.save();
        await expect(userToSave2.save()).to.be.rejectedWith('User already exists with this email Id');
    });
});
