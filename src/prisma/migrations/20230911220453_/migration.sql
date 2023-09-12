/*
  Warnings:

  - You are about to drop the column `authorCompany` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `authorJobTitle` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `authorPersona` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `authorUserName` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "authorCompany",
DROP COLUMN "authorJobTitle",
DROP COLUMN "authorPersona",
DROP COLUMN "authorUserName";
