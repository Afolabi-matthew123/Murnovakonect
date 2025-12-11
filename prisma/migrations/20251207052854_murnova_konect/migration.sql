/*
  Warnings:

  - A unique constraint covering the columns `[name,schoolId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Role_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_schoolId_key" ON "Role"("name", "schoolId");
