import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.createMany({
    data: [
      {
        email: "first@gmail.com",
        password: "123",
        created_At: new Date(),
        bio: "New Bio",
        persona: "PASSPORTBRO",
        jobTitle: "Software Engineer",
        companyName: "Tech",
      },
      {
        email: "second@gmail.com",
        password: "123",
        created_At: new Date(),
        bio: "I'm new here",
        persona: "EXPAT",
        jobTitle: "Data Analyst",
        companyName: "Tech World",
      },
      {
        email: "third@gmail.com",
        password: "123",
        created_At: new Date(),
        bio: "Another one",
        persona: "BACKPACKER",
        jobTitle: "Coach Potato",
        companyName: "Your Coach",
      },
      {
        email: "fourth@gmail.com",
        password: "123",
        created_At: new Date(),
        bio: "Hello Governor",
        persona: "DIGITALNOMAD",
        jobTitle: "Sales",
        companyName: "Your Moms House",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Users created:", users);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
