import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  // test route
  app.get("/hello", async () => {
    return "hello";
  });

  // get all users
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

  // get user by email
  // this route is used to validate login /create new user
  app.get("/user/:email", async (request, response) => {
    const getUserParams = z.object({
      email: z.string(),
    });

    const { email } = getUserParams.parse(request.params);

    const userFromDb = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if the user exists return the object, else return false to indicate front end
    // to sinilize the user to create a account
    if (userFromDb) return userFromDb;
    else return false;
  });
}
