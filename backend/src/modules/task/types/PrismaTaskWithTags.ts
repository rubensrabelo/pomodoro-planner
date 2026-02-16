import { Task as PrismaTask } from "prisma/generated/prisma_client/client";

export type PrismaTaskWithTags = PrismaTask & {
    tags?: {
        id: number;
        name: string;
    }[];
};