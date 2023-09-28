-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "friendId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friends"("id") ON DELETE SET NULL ON UPDATE CASCADE;
