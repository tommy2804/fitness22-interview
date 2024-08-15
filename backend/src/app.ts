import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { recipesRouter } from "./routes/recipes";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.use("/api/recipes", recipesRouter);

app.all("*", async () => {
  throw new NotFoundError("route did not found");
});

app.use(errorHandler);

export { app };
