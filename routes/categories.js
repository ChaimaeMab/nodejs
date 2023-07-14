const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /categories
router.get('/', async (req, res) => {
  const categories = await prisma.categorie.findMany();
  res.json(categories);
});

// GET /categories/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const categorie = await prisma.categorie.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(categorie);
});

// POST /categories
router.post('/', async (req, res) => {
  const { nom } = req.body;
  const categorie = await prisma.categorie.create({
    data: { nom },
  });
  res.json(categorie);
});

// PATCH /categories/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const categorie = await prisma.categorie.update({
    where: { id: parseInt(id) },
    data: { nom },
  });
  res.json(categorie);
});

// DELETE /categories/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.categorie.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Category deleted' });
});

module.exports = router;
