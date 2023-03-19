import { z } from "zod";
import { procedure, router } from "../trpc";

const users = ["apple"];

export const appRouter = router({
  getUser: procedure.input(z.number()).query(({ input: index }) => {
    return {
      user: users[index],
    };
  }),
  getUsers: procedure.query(() => {
    return users;
  }),
  createUser: procedure.input(z.string()).mutation(({ input: username }) => {
    users.push(username);
    return {
      user: username,
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
