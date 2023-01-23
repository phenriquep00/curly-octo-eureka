import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {
	// test route
  app.get("/hello", async () => {
    return "hello";
  });

	
}
