import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.createMany({
    data: [
      {
        email: "first@gmail.com",
        password: await bcrypt.hash("12345678", 5),
        created_At: new Date(),
        bio: "New Bio",
        persona: "PASSPORTBRO",
        jobTitle: "Software Engineer",
        companyName: "Tech",
        userName: "Sam Last"
      },
      {
        email: "second@gmail.com",
        password: await bcrypt.hash("12345678", 5),
        created_At: new Date(),
        bio: "I'm new here",
        persona: "EXPAT",
        jobTitle: "Data Analyst",
        companyName: "Tech World",
        userName: "Sam T"
      },
      {
        email: "third@gmail.com",
        password: await bcrypt.hash("12345678", 5),
        created_At: new Date(),
        bio: "Another one",
        persona: "BACKPACKER",
        jobTitle: "Coach Potato",
        companyName: "Your Coach",
        userName: "Sam R"
      },
      {
        email: "fourth@gmail.com",
        password: await bcrypt.hash("12345678", 5),
        created_At: new Date(),
        bio: "Hello Governor",
        persona: "DIGITALNOMAD",
        jobTitle: "Sales",
        companyName: "Your Moms House",
        userName: "Sam L"
      },
    ],
    skipDuplicates: true,
  });

  const allUsers = await prisma.users.findMany();

  for (const user of allUsers) {
    for (let i = 1; i <= 15; i++) {
      await prisma.posts.create({
        data: {
          postBody: `This is post #${i} by ${user.email}`,
          createdAT: new Date(),
          author: {
            connect: { id: user.id },
          },
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  export{}
