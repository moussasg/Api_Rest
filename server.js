// lancer server with express
const express = require('express');
const app = express();
const port = 3000
// Démarrer le serveur en écoutant sur un port spécifique
app.listen(port, () => {
  console.log(`Serveur lancé sur le port 3000`);
});
const router = express.Router();
const User = require('./User'); // pour charger le module User.js
// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    favoriteFoods: req.body.favoriteFoods,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name;
    user.age = req.body.age;
    user.favoriteFoods = req.body.favoriteFoods;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE remove a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
