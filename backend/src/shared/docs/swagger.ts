import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "PomoPlanner API",
      version: "1.0.0",
      description: "API for managing tasks with pomodoro",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: [
    "./src/modules/**/docs/*.ts",
    "./src/shared/docs/*.ts",
  ],
});
