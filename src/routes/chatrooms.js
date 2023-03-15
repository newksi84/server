const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM chatrooms';
  try {
    const result = await db.executeQuery(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }});

router.post('/', async (req, res) => {
  const { name, user_id } = req.body;
  const query = 'INSERT INTO chatrooms (name, user_id) VALUES (?, ?)';
  try {
    const result = await db.executeQuery(query, [name, user_id]);
    res.status(201).json({ id: result.insertId, name, user_id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, user_id } = req.body;
  const query = 'UPDATE chatrooms SET name = ?, user_id = ? WHERE id = ?';
  try {
    const result = await db.executeQuery(query, [name, user_id, id]);
    if (result.changedRows === 0) {
      res.status(404).json({ error: 'Chat room not found' });
    } else {
      res.status(200).json({ id, name, user_id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:chatRoomName', async (req, res) => {
  const chatRoomName = req.params.chatRoomName;
  const query = `DELETE FROM chatrooms WHERE name = '${chatRoomName}'`;
  try {
    const result = await db.executeQuery(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
