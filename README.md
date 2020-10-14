To run backend with hot reload:

```
nodemon index
```

Start mongodb instance on MacOS

sudo mongod --config /usr/local/etc/mongod.conf


To run:

1. Start mongodb. 

```
# For MacOS if installed using brew
sudo mongod --config /usr/local/etc/mongod.conf
```

2. Install dependencies.

```
npm install
```

3. Run the backend server with hot reload.

```
npm start
```


API Endpoints:

- `GET /api/contacts` list all contacts
- `POST /api/contacts` create new contact
- `GET /api/contacts/{id}` retrieve a single contact
- `PUT /api/contacts/{id}` update a single contact
- `DELETE /api/contacts/{id}` delete a single contact

To test:

```
npm test
```