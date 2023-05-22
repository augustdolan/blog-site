import { now } from "next-auth/client/_utils";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAllPreviews: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
  publish: publicProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), authorId: z.string() })
    )
    .mutation(({ ctx, input }) => {
      const { title, content, authorId } = input;
      return ctx.prisma.post.create({
        data: {
          title,
          content,
          authorId,
        },
      });
    }),
});
