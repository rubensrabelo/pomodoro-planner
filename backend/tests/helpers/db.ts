import { prisma } from "@/infra/prisma/client";

export async function cleanDatabase() {
  await prisma.task.deleteMany();
  await prisma.tag.deleteMany();
}
