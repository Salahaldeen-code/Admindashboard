/*
  Warnings:

  - You are about to alter the column `title` on the `NewsEvents` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `short_description` on the `NewsEvents` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "NewsEvents" ALTER COLUMN "title" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "short_description" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "image" DROP NOT NULL;
