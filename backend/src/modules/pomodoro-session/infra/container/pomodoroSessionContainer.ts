import { PomodoroSessionController } from "../../api/controllers/PomodoroSessionController";
import { PomodoroSessionService } from "../../application/services/PomodoroSessionService";
import { PrismaPomodoroSessionRepository } from "../repositories/PrismaPomodoroSessionRepository";

const pomodoroSessionRepository = new PrismaPomodoroSessionRepository();

const pomodoroSessionService = new PomodoroSessionService(
  pomodoroSessionRepository
);

const pomodoroSessionController = new PomodoroSessionController(
  pomodoroSessionService
);

export { pomodoroSessionController };
