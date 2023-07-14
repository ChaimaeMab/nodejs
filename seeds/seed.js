const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

async function main() {
  await prisma.$queryRaw('DELETE FROM Commentaire');
  await prisma.$queryRaw('DELETE FROM Article');
  await prisma.$queryRaw('DELETE FROM Categorie');
  await prisma.$queryRaw('DELETE FROM User');

  // Create users
  const authorRole = await prisma.role.findUnique({ where: { name: 'AUTHOR' } });

  const admin = await prisma.user.create({
    data: {
      nom: faker.name.firstName(),
      email: 'admin@example.com',
      password: 'adminpassword',
      role: { connect: { id: authorRole.id } },
    },
  });

  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        nom: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'password',
        role: { connect: { id: authorRole.id } },
      },
    });
    users.push(user);
  }

  // Create categories
  const categories = [];
  for (let i = 0; i < 10; i++) {
    const categorie = await prisma.categorie.create({
      data: { nom: faker.lorem.word() },
    });
    categories.push(categorie);
  }

  // Create articles
  for (let i = 0; i < 100; i++) {
    const randomUser = faker.random.arrayElement(users);
    const randomCategories = faker.random.arrayElements(categories, faker.random.number({ min: 1, max: 4 }));

    await prisma.article.create({
      data: {
        titre: faker.lorem.sentence(),
        contenu: faker.lorem.paragraphs(),
        image: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date(),
        published: faker.random.boolean(),
        userId: randomUser.id,
        categories: { connect: randomCategories.map((category) => ({ id: category.id })) },
      },
    });
  }

  console.log('Seed data created.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
