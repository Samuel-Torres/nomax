-- CreateEnum
CREATE TYPE "personaTypes" AS ENUM ('PASSPORTBRO', 'DIGITALNOMAD', 'EXPAT', 'TOURIST', 'BACKPACKER');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" TEXT,
    "persona" "personaTypes",
    "jobTitle" TEXT,
    "companyName" TEXT,
    "userName" TEXT,
    "newUser" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
