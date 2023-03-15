const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM title';
  try {
    const result = await db.executeQuery(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO title (name) VALUES (?)';
  try {
    const result = await db.executeQuery(query, [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/google_oauth', async (req, res) => {
    const {  email, name } = req.body;
    
    // access token, ID token, email, name 정보를 google_oauth 테이블에 추가합니다.
    const query = 'INSERT INTO google_oauth (email, name) VALUES (?, ?)';
    try {
        const result = await db.executeQuery(query, [email || null, name || null]);
        res.status(200).send();
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const query = 'UPDATE title SET name = ? WHERE id = ?';
  try {
    const result = await db.executeQuery(query, [name, id]);
    if (result.changedRows === 0) {
      res.status(404).json({ error: 'Title not found' });
    } else {
      res.status(200).json({ id, name });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM title WHERE id = ?';
  try {
    const result = await db.executeQuery(query, [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Title not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
