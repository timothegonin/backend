const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./models/thing");
require("dotenv").config();

const app = express();

mongoose
	.connect(
		"mongodb+srv://" +
			process.env.API_USER +
			":" +
			process.env.API_USER_PASS +
			"@cluster0.p9ahqrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.post("/api/stuff", (req, res, next) => {
	delete req.body._id;
	const thing = new Thing({
		...req.body,
	});
	thing
		.save()
		.then(() => res.status(201).json({ message: "Objet enregistré !" }))
		.catch((error) => res.status(400).json({ error }));
});

app.put("/api/stuff/:id", (req, res, next) => {
	Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet modifié !" }))
		.catch(() => res.status(400).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet supprimé !" }))
		.catch(() => res.status(400).json({ error }));
});

app.get("/api/stuff/:id", (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
		.then((thing) => res.status(200).json(thing))
		.catch((error) => res.status(404).json({ error }));
});

app.get("/api/stuff", (req, res, next) => {
	// const stuff = [
	// 	{
	// 		_id: "oeihfzeoi",
	// 		title: "Mon premier objet",
	// 		description: "Les infos de mon premier objet",
	// 		imageUrl:
	// 			"https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
	// 		price: 4900,
	// 		userId: "qsomihvqios",
	// 	},
	// 	{
	// 		_id: "oeihfzeomoihi",
	// 		title: "Mon deuxième objet",
	// 		description: "Les infos de mon deuxième objet",
	// 		imageUrl:
	// 			"https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
	// 		price: 2900,
	// 		userId: "qsomihvqios",
	// 	},
	// ];
	// res.status(200).json(stuff);
	Thing.find()
		.then((things) => res.status(200).json(things))
		.catch((error) => res.status(400).json({ error }));
});

// app.use((req, res, next) => {
// 	console.log("Request received");
// 	next();
// });

// app.use((req, res, next) => {
// 	res.status(201);
// 	next();
// });

// app.use((req, res, next) => {
// 	res.json({ message: "Your request has been received" });
// 	next();
// });

// app.use((req, res, next) => {
// 	console.log("Response sent successfully!");
// });

module.exports = app;
