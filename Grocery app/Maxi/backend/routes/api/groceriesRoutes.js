const express = require('express');

let Groceries = require('../../models/Groceries');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const groceryDb = await Groceries.find();
    res.send(groceryDb);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const grocery = await Groceries.findById(req.params.id);
    if (!grocery) {
      return res.status(404).send('grocery not found');
    }
    res.send(grocery);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/',
  auth,
  [check('name').not().isEmpty(), check('quantity').not().isEmpty(), check('rate').not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newGrocery = new Groceries({
        name: req.body.name,
        quantity: req.body.quantity,
        rate: req.body.rate,
      });
      const result = await newGrocery.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.delete('/',auth, async (req, res) => {
  try {
    const grocery = await Groceries.findById(req.body.id);
    if (!grocery) {
      return res.status(404).json({ msg: 'Grocery not found' });
    }
    const result = await Groceries.findByIdAndDelete({ _id: req.body.id });
    res.send(result);
  } catch (err) {
    res.status(500).send('server error');
  }
});

router.put('/',
  auth,
  [check('name').not().isEmpty(), check('quantity').not().isEmpty(), check('rate').not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const grocery = await Groceries.findById(req.body.id);
      if (!grocery) {
        return res.status(404).json({ msg: 'grocery not found' });
      }

      grocery.name = req.body.name;
      grocery.quantity = req.body.quantity;
      grocery.rate = req.body.rate;
      await grocery.save();
      res.send(grocery);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
