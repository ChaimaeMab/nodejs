const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /articles
router.get('/', async (req, res) => {
  const articles = await prisma.article.findMany();
  res.json(articles);
});

// GET /articles/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(article);
});

// POST /articles
router.post('/', async (req, res) => {
  const { titre, contenu, image, published, userId, categorieIds } = req.body;
  const article = await prisma.article.create({
    data: {
      titre,
      contenu,
      image,
      published,
      user: { connect: { id: userId } },
      categories: { connect: categorieIds.map((id) => ({ id })) },
    },
  });
  res.json(article);
});

// PATCH /articles/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { titre, contenu, image, published } = req.body;
  const article = await prisma.article.update({
    where: { id: parseInt(id) },
    data: { titre, contenu, image, published },
  });
  res.json(article);
});

// DELETE /articles/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Article deleted' });
});

module.exports = router;
