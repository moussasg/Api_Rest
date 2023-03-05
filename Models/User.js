const mongoose = require('mongoose');
const dbURI = process.env.DB_URI; // la variable d'environnement doit être écrite en majuscules
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 30000 })
  .then(() => {
    console.log('Connexion réussie à la base de données');
    const peopleSchema = new mongoose.Schema({
      name: String,
      age: Number,
      favoriteFoods: Array,
    });
    const Person = mongoose.model('Person', peopleSchema); // créer un modèle à partir du schéma
    // Créer un nouvel objet Person à partir du modèle
    const newPerson = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger'],
    });
    // Sauvegarder l'objet dans la base de données
    newPerson.save()
      .then(() => console.log('Person saved successfully'))
      .catch((err) => console.error('Error saving person:', err));
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données : ', err);
  });
