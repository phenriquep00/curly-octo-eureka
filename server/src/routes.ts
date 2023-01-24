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
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        pictureUrl: true,
        created_at: true,
        tasklists: {
          select: {
            id: true,
            name: true,
            userId: true,
            created_at: true,
            tasks: {
              select: {
                id: true,
                name: true,
                description: true,
                completed: true,
                created_at: true,
                tasklistId: true,
              },
            },
          },
        },
      },
    });

    return users;
  });

}
