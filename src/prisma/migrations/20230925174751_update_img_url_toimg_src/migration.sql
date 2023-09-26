/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Photos` table. All the data in the column will be lost.
  - Added the required column `imageSrc` to the `Photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photos" DROP COLUMN "imageUrl",
ADD COLUMN     "imageSrc" TEXT NOT NULL;
