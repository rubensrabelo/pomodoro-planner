import { prisma } from "@/infra/prisma/client";

export async function cleanDatabase() {
  await prisma.tag.deleteMany();
  await prisma.task.deleteMany();
}
