import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
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
    // Made public for hardcoded admin auth (localStorage based)
    list: publicProcedure
      .query(async () => {
        const { getBookings } = await import("./db");
        return await getBookings();
      }),
    // Made public for hardcoded admin auth (localStorage based)
    updateStatus: publicProcedure
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
