import { Router } from "express";
import { tagController } from "../../infra/container/tag.container";

const tagRoutes = Router();

tagRoutes.get("/", (req, res) => tagController.findAll(req, res));
tagRoutes.get("/:id", (req, res) => tagController.findById(req, res));
tagRoutes.post("/", (req, res) => tagController.create(req, res));
tagRoutes.put("/:id", (req, res) => tagController.update(req, res));
tagRoutes.delete("/:id", (req, res) => tagController.delete(req, res));

export { tagRoutes };
