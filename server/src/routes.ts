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

  // create new user route
  app.post("/user", async (request, reponse) => {
    const newUserBody = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
      pictureUrl: z.string().url(),
    });

    // extract the data from request body
    const { username, email, password, pictureUrl } =
      newUserBody.parse(request.body);

    // create the user with the info from front-end
    await prisma.user.create({
      data: {
        username,
        email,
        password,
        pictureUrl,
        created_at: new Date(),
        tasklists: {
          create: {
            name: "Welcome",
            created_at: new Date(),
            tasks: {
              create: {
                name: "first task",
                description:
                  "Welcome! this is your first task, try completing it",
                completed: false,
                created_at: new Date(),
              },
            },
          },
        },
      },
    });


  });
}
