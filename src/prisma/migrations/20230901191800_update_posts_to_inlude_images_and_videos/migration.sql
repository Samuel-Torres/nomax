-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "imageSrc" TEXT,
ADD COLUMN     "videoSrc" TEXT,
ALTER COLUMN "postBody" DROP NOT NULL;
