/*
  Warnings:

  - You are about to drop the column `photosId` on the `CoffeeShop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_coffeeshopId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "photosId";
