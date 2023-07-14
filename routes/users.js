const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /users
router.get('/', async (req, res) => {
  const users = await prisma.utilisateur.findMany();
  res.json(users);
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.utilisateur.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(user);
});

// POST /users
router.post('/', async (req, res) => {
  const { nom, email, password, roleId } = req.body;
  const user = await prisma.utilisateur.create({
    data: { nom, email, password, roleId: parseInt(roleId) },
  });
  res.json(user);
});

// PATCH /users/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, email, password } = req.body;
  const user = await prisma.utilisateur.update({
    where: { id: parseInt(id) },
    data: { nom, email, password },
  });
  res.json(user);
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.utilisateur.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'User deleted' });
});

module.exports = router;
