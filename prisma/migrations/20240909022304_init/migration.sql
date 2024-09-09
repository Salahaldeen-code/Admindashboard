/*
  Warnings:

  - You are about to drop the column `description` on the `Services` table. All the data in the column will be lost.
  - Added the required column `descriptionL` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionM` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" DROP COLUMN "description",
ADD COLUMN     "descriptionL" VARCHAR(200) NOT NULL,
ADD COLUMN     "descriptionM" TEXT NOT NULL;
