let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("./index.js");
let should = chai.should();
//let expect = chai.expect();

const contacts = require('./data/contactsData.js')
// import contacts from './data/contactsData.js'

const Contact = require('./models/contactModel.js');

chai.use(chaiHttp);

describe('contact', () => {

    //remove all contacts before every test and then add dummy contacts in.
    beforeEach((done) => {
        Contact.remove({}, (err) => {
            done();
        })
    })


})

