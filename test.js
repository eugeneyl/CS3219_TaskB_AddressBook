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

    /**
     * /POST route
     */

     //Test the /POST route with no fields at all
     describe('/POST contact', () => {
        it('it should not POST contact with no fields', (done) => {

            chai
                .request(server)
                .post("/api/contacts")
                .end((err, res) => {
                    res.body.should.have.property("status").eql("error")
                    res.body.should.have.property("message").eql("Please input a name for your contact.")
                    done()
                })
        })
    }) 

    //Test the /POST route with no name fields
    describe('/POST contact', () => {
        it('it should not POST contact with no name fields', (done) => {
            var temp = {
                gender: "Male",
                email: "jd@gmail.com",
                phone: "91122334"
            }

            chai
                .request(server)
                .post("/api/contacts")
                .send(temp)
                .end((err, res) => {
                    res.body.should.have.property("status").eql("error")
                    res.body.should.have.property("message").eql("Please input a name for your contact.")
                    done()
                })
        })
    }) 

    //Test the /POST route with complete data
    describe('/POST contact', () => {
        it('it should POST contact successfully with all data fields present', (done) => {
            var temp = contacts[0]

            chai
                .request(server)
                .post("/api/contacts")
                .send(temp)
                .end((err, res) => {
                    res.body.data.should.be.a('object')
                    res.body.data.should.have.property('name').eql(temp.name)
                    res.body.data.should.have.property('gender').eql(temp.gender)
                    res.body.data.should.have.property('phone').eql(temp.phone)
                    res.body.data.should.have.property('email').eql(temp.email)
                    done()
                })
        })
    })

    //Test the /POST route with missing gender
    describe('/POST contact', () => {
        it('it should POST contact successfully with missing gender field', (done) => {
            var temp = {
                name: "John Doe",
                email: "jd@gmail.com",
                phone: "91122334"
            }

            chai
                .request(server)
                .post("/api/contacts")
                .send(temp)
                .end((err, res) => {
                    res.body.data.should.be.a('object')
                    res.body.data.should.not.have.property('gender')
                    res.body.data.should.have.property('name').eql(temp.name)
                    res.body.data.should.have.property('phone').eql(temp.phone)
                    res.body.data.should.have.property('email').eql(temp.email)
                    done()
                })
        })
    }) 
})

