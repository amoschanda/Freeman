import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "acemayeson8@gmail.com",
    name: "Admin",
    loginMethod: "direct",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("bookings API", () => {
  describe("bookings.create", () => {
    it("should create a booking with valid data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bookings.create({
        name: "John Doe",
        email: "john@example.com",
        phone: "555-1234",
        address: "123 Main St",
        serviceType: "general-cleaning",
        date: "2026-03-15",
        time: "10:00",
        description: "Regular home cleaning",
        images: [],
      });

      expect(result).toBeDefined();
    });

    it("should validate email format", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.create({
          name: "John Doe",
          email: "invalid-email",
          phone: "555-1234",
          address: "123 Main St",
          serviceType: "general-cleaning",
          date: "2026-03-15",
          time: "10:00",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should require all mandatory fields", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.create({
          name: "",
          email: "john@example.com",
          phone: "555-1234",
          address: "123 Main St",
          serviceType: "general-cleaning",
          date: "2026-03-15",
          time: "10:00",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("bookings.list", () => {
    it("should allow admin to list bookings", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bookings.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should deny non-admin users from listing bookings", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.list();
        expect.fail("Should have thrown UNAUTHORIZED error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("bookings.updateStatus", () => {
    it("should allow admin to update booking status", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      // First create a booking
      const publicCaller = appRouter.createCaller(createPublicContext());
      const booking = await publicCaller.bookings.create({
        name: "John Doe",
        email: "john@example.com",
        phone: "555-1234",
        address: "123 Main St",
        serviceType: "general-cleaning",
        date: "2026-03-15",
        time: "10:00",
      });

      // Then update its status
      if (booking && "insertId" in booking) {
        const result = await caller.bookings.updateStatus({
          id: booking.insertId,
          status: "approved",
        });
        expect(result).toBeDefined();
      }
    });

    it("should deny non-admin users from updating status", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.updateStatus({
          id: 1,
          status: "approved",
        });
        expect.fail("Should have thrown UNAUTHORIZED error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });
});
