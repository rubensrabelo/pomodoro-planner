import { TagController } from "../../api/controllers/TagController";
import { TagService } from "../../application/services/TagService";
import { PrismaTagRepository } from "../repositories/PrismaTagRepository";

const tagRepository = new PrismaTagRepository();

const tagService = new TagService(tagRepository);

const tagController = new TagController(tagService);

export { tagController };
