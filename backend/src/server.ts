import express from "express";
import { prisma } from "./prisma/client";

const app = express();
app.use(express.json());

app.get("/tags", async (_req, res) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
});

app.post("/tags", async (req, res) => {
  const { name } = req.body;
  const tag = await prisma.tag.create({ data: { name } });
  res.status(201).json(tag);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
