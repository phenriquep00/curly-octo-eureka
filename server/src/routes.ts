import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  // test route
  app.get("/hello", async () => {
    return "hello";
  });

  // get users
  app.get("/users", async () => {
    const users = await prisma.user.findMany();

    return users;
  });

  // get tasklists
  app.get("/tasklists", async () => {
    const tasklists = await prisma.tasklist.findMany();

    return tasklists;
  })
}
