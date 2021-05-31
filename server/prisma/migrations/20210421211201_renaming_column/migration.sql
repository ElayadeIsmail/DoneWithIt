/*
  Warnings:

  - You are about to drop the column `categories` on the `listings` table. All the data in the column will be lost.
  - Added the required column `category` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "categories",
ADD COLUMN     "category" "Categories" NOT NULL;
