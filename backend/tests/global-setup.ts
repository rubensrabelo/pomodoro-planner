import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "child_process";

export default async function () {
  const container = await new PostgreSqlContainer("postgres:15")
    .withDatabase("test_db")
    .withUsername("test")
    .withPassword("test")
    .start();

  process.env.DATABASE_URL = container.getConnectionUri();

  execSync("npx prisma generate", { stdio: "inherit" });
  execSync("npx prisma db push", { stdio: "inherit" });

  process.on("exit", async () => {
    await container.stop();
  });
}
