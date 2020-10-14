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

    // Test the /GET all route without any entries
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

    // Test the /GET all route with dummy entries
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

    //Test the /GET/:id route with correct id
    describe('/GET/:id contact', () => {
        it('it should GET the contact with the correspoding id', (done) => {
            var temp = new Contact();
            temp.name = contacts[0].name
            temp.gender = contacts[0].gender;
            temp.email = contacts[0].email;
            temp.phone = contacts[0].phone;
            temp.save((err, contact) => {
                chai
                    .request(server)
                    .get("/api/contacts/" + contact.id)
                    .end((err, res) => {
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('name').eql(temp.name)
                        res.body.data.should.have.property('gender').eql(temp.gender)
                        res.body.data.should.have.property('phone').eql(temp.phone)
                        res.body.data.should.have.property('email').eql(temp.email)
                        done()
                    })
            })
        })
    })

    //Test the /GET/:id route with incorrect id
    describe('/GET/:id contact', () => {
        it('it should not GET any contact', (done) => {
            var temp = new Contact();
            temp.name = contacts[0].name
            temp.gender = contacts[0].gender;
            temp.email = contacts[0].email;
            temp.phone = contacts[0].phone;
            temp.save((err, contact) => {
                chai
                    .request(server)
                    .get("/api/contacts/" + "123")
                    .end((err, res) => {
                        res.body.should.have.property("status").eql("error")
                        res.body.should.have.property("message").eql("Contact cannot be found.")
                        done()
                    })
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

    /**
     * /PUT route
     */
    //Test the /PUT/:id route with correct id and valid fields
    describe('/PUT/:id contact', () => {
        it('it should edit the contact with the correspoding id and replace the email field with new email', (done) => {
            var temp = new Contact();
            temp.name = contacts[0].name
            temp.gender = contacts[0].gender;
            temp.email = contacts[0].email;
            temp.phone = contacts[0].phone;
            temp.save((err, contact) => {
                var newEmail = "new_email@gmail.com"
                chai
                    .request(server)
                    .put("/api/contacts/" + contact.id)
                    .send({email: newEmail})
                    .end((err, res) => {
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('name').eql(temp.name)
                        res.body.data.should.have.property('gender').eql(temp.gender)
                        res.body.data.should.have.property('phone').eql(temp.phone)
                        res.body.data.should.have.property('email').eql(newEmail)
                        done()
                    })
            })
        })
    })

    //Test the /PUT/:id route with correct id and no fields
    describe('/PUT/:id contact', () => {
        it('it should not edit any of the fields of the contact with the corresponding id', (done) => {
            var temp = new Contact();
            temp.name = contacts[0].name
            temp.gender = contacts[0].gender;
            temp.email = contacts[0].email;
            temp.phone = contacts[0].phone;
            temp.save((err, contact) => {
                chai
                    .request(server)
                    .put("/api/contacts/" + contact.id)
                    .end((err, res) => {
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('name').eql(temp.name)
                        res.body.data.should.have.property('gender').eql(temp.gender)
                        res.body.data.should.have.property('phone').eql(temp.phone)
                        res.body.data.should.have.property('email').eql(temp.email)
                        done()
                    })
            })
        })
    })

    //Test the /PUT/:id route with incorrect id
    describe('/PUT/:id contact', () => {
        it('it should show that the no contact can be found', (done) => {
            var temp = new Contact();
            temp.name = contacts[0].name
            temp.gender = contacts[0].gender;
            temp.email = contacts[0].email;
            temp.phone = contacts[0].phone;
            temp.save((err, contact) => {
                chai
                    .request(server)
                    .put("/api/contacts/" + "123")
                    .end((err, res) => {
                        res.body.should.have.property("status").eql("error")
                        res.body.should.have.property("message").eql("Contact cannot be found.")
                        done()
                    })
            })
        })
    })
    
})

