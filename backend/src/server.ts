import express from "express";

import { tagRoutes } from "./modules/tag/api/routes/tag.routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express()
app.use(express.json())

app.use("/tags", tagRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})
