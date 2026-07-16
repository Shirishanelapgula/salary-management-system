import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import auditRoutes from "./routes/audit.routes.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Salary Management API Running",
  });
});

app.use("/api", routes);

app.use("/api/audit", auditRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;