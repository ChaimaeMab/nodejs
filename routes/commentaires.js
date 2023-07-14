const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /commentaires
router.get('/', async (req, res) => {
  const commentaires = await prisma.commentaire.findMany();
  res.json(commentaires);
});

// GET /commentaires/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const commentaire = await prisma.commentaire.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(commentaire);
});

// POST /commentaires
router.post('/', async (req, res) => {
  const { email, contenu, articleId } = req.body;
  const commentaire = await prisma.commentaire.create({
    data: {
      email,
      contenu,
      article: { connect: { id: articleId } },
    },
  });
  res.json(commentaire);
});

// PATCH /commentaires/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, contenu } = req.body;
  const commentaire = await prisma.commentaire.update({
    where: { id: parseInt(id) },
    data: { email, contenu },
  });
  res.json(commentaire);
});

// DELETE /commentaires/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.commentaire.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Comment deleted' });
});

module.exports = router;
