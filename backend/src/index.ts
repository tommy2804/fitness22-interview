import { Request, Response } from "express";
import http from "http";
import { app } from "./app";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.get("/ping", (req: Request, res: Response) => {
  return res.status(200).json({ hello: "world!" });
});

const start = async () => {
  console.log("Starting up...");
  /** Listen */
  server.listen(PORT, async () => {
    console.info(`Server is running on port ${PORT}`);
  });
};

start().catch((error) => {
  console.error("Error during startup:", error);
  process.exit(1);
});
