import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  bookings: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        address: z.string().min(1),
        serviceType: z.string().min(1),
        date: z.string().min(1),
        time: z.string().min(1),
        description: z.string().optional(),
        images: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        const { createBooking } = await import("./db");
        return await createBooking({
          ...input,
          images: input.images ? JSON.stringify(input.images) : null,
        });
      }),
    list: protectedProcedure
      .use(async ({ ctx, next }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return next({ ctx });
      })
      .query(async () => {
        const { getBookings } = await import("./db");
        return await getBookings();
      }),
    updateStatus: protectedProcedure
      .use(async ({ ctx, next }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return next({ ctx });
      })
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        const { updateBookingStatus } = await import("./db");
        return await updateBookingStatus(input.id, input.status);
      }),
  }),
});

export type AppRouter = typeof appRouter;
