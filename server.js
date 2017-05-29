var express = require('express');
var bodyParser = require('bodyParser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();

app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, funciton(err, database) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	db = database;

	console.log("Database connection ready");

	var server = app.listen(process.env.PORT || 8080, function() {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
});

//CONTACTS API ROUTES BELOW

//Generic erros handling. All endpoints will use this handler.
function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error":message});
}

/* /api/contacts/
 * GET: find all contacts
 * POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
	db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs){
		if (err) {
			handleError(res, err.message, "Failed to get contacts");
		} else {
			res.status(200).json(docs);
		}
	});
});

app.post("/api/contacts", function(req, res) {
	var newContact = req.body;

	if (!req.body.name) {
		handleError(res, "Invalid user input", "Must provide a name", 400);
	}

	db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to create a new contact");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});
});

/* /api/contacts/:id
 * GET: find a contact by id
 * PUT: updates a contact by id
 * DELETE: deletes a contact by id
 */
app.get("/api/contacts/:id", function(req, res) {

});

app.put("/api/contacts/:id", function(req, res) {

});

app.delete("/api/contacts/:id", function(req, res) {

});