/*
  Warnings:

  - Added the required column `categories` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('Clothes', 'Accessories', 'Furniture', 'Electronics', 'Books', 'Other');

-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "categories" "Categories" NOT NULL;
