import { Prisma, PrismaClient, Users } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const users: Omit<Users, "id">[] = [
        {
            email: "first@gmail.com",
            password: "123",
            created_At: new Date(),
            bio: "New Bio",
            persona: "PASSPORTBRO",
            jobTitle: "Software Engineer",
            companyName: "Tech"
        },
        {
            email: "second@gmail.com",
            password: "123",
            created_At: new Date(),
            bio: "I'm new here",
            persona: "EXPAT",
            jobTitle: "Data Analyst",
            companyName: "Tech World"
        },
        {
            email: "third@gmail.com",
            password: "123",
            created_At: new Date(),
            bio: "Another one",
            persona: "BACKPACKER",
            jobTitle: "Coach Potato",
            companyName: "Your Coach"
        },
        {
            email: "fourth@gmail.com",
            password: "123",
            created_At: new Date(),
            bio: "Hello Governor",
            persona: "DIGITALNOMAD",
            jobTitle: "Sales",
            companyName: "Your Moms House"
        },

    ]
    users.map(async (user) => {
        await prisma.users.create({
            data: user
        })
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        process.exit(1);
    })