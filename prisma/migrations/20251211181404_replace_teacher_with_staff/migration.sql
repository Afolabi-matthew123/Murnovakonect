/*
  Warnings:

  - The values [TEACHER,BURSAR] on the enum `RoleName` will be removed. If these variants are still used in the database, this will fail.
  - The values [TEACHER,BURSAR] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `teacherId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleName_new" AS ENUM ('SUPER_ADMIN', 'SCHOOL_ADMIN', 'STAFF', 'PARENT', 'STUDENT');
ALTER TABLE "Role" ALTER COLUMN "name" TYPE "RoleName_new" USING ("name"::text::"RoleName_new");
ALTER TYPE "RoleName" RENAME TO "RoleName_old";
ALTER TYPE "RoleName_new" RENAME TO "RoleName";
DROP TYPE "public"."RoleName_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('SUPER_ADMIN', 'SCHOOL_ADMIN', 'STAFF', 'PARENT', 'STUDENT');
ALTER TABLE "public"."User" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "public"."UserType_old";
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'STUDENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teacherId_fkey";

-- DropIndex
DROP INDEX "Role_name_schoolId_key";

-- DropIndex
DROP INDEX "User_teacherId_idx";

-- DropIndex
DROP INDEX "User_teacherId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teacherId",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "staffId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_staffId_key" ON "User"("staffId");

-- CreateIndex
CREATE INDEX "User_staffId_idx" ON "User"("staffId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffNo") ON DELETE SET NULL ON UPDATE CASCADE;
