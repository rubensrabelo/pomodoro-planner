import { prisma } from "@/infra/prisma/client";

export async function cleanDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "_TagToTask",
      "pomodoro_sessions",
      "tasks",
      "tags"
    RESTART IDENTITY CASCADE;
  `);
}
