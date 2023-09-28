-- CreateEnum
CREATE TYPE "notificationType" AS ENUM ('friend_request', 'message', 'comment_post', 'comment_reply', 'comment_photo');

-- CreateEnum
CREATE TYPE "notificationStatus" AS ENUM ('pending', 'accepted', 'read');

-- CreateEnum
CREATE TYPE "friendStatus" AS ENUM ('pending', 'accepted', 'rejected', 'blocked', 'inactive');

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "type" "notificationType" NOT NULL,
    "status" "notificationStatus" NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "userA" INTEGER NOT NULL,
    "userB" INTEGER NOT NULL,
    "status" "friendStatus" NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_id_key" ON "Notifications"("id");

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_userA_fkey" FOREIGN KEY ("userA") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_userB_fkey" FOREIGN KEY ("userB") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
