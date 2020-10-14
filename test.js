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


    /**
     * /GET route
     */

    // Test the /GET route without any entries
    describe('/GET contact', () => {
        it('it should GET all the contacts', (done) => {

            chai
                .request(server)
                .get("/api/contacts")
                .end((err, res) => {
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    res.body.should.have.property('message').eql("Contacts retrieved successfully")
                    done()
                })
        })
    }) 

    // Test the /GET route with dummy entries
    describe('/GET contact', () => {
        it('it should GET all the contacts', (done) => {
            contacts.forEach(async (contact) => {
                var temp = new Contact();
                temp.name = contact.name
                temp.gender = contact.gender;
                temp.email = contact.email;
                temp.phone = contact.phone;
                await temp.save()
            })

            chai
                .request(server)
                .get("/api/contacts")
                .end((err, res) => {
                    should.exist(res.body);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(3);
                    res.body.should.have.property('message').eql("Contacts retrieved successfully")
                    done()
                })
        })
    })


})

