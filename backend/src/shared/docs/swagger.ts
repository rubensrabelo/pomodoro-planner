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
        url: "/api/v1",
        description: "Servidor Atual (Dinâmico)",
      },
      {
        url: "https://pomodoro-planner.onrender.com/api/v1",
        description: "Servidor de Produção (Render)",
      },
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: [
    "./src/modules/**/docs/*.ts",
    "./src/shared/docs/*.ts",
    "./dist/src/modules/**/docs/*.js",
    "./dist/src/shared/docs/*.js",
  ],
});
