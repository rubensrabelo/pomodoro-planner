/*
  Warnings:

  - Made the column `started_at` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "started_at" SET NOT NULL;
