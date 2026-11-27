import { describe, expect, it } from "vitest";

import { PLAN_LIMITS } from "@/lib/plans";

describe("PLAN_LIMITS", () => {
  it("gives the free plan finite limits", () => {
    expect(Number.isFinite(PLAN_LIMITS.free.items)).toBe(true);
    expect(Number.isFinite(PLAN_LIMITS.free.collections)).toBe(true);
  });

  it("gives the pro plan unlimited items and collections", () => {
    expect(PLAN_LIMITS.pro.items).toBe(Infinity);
    expect(PLAN_LIMITS.pro.collections).toBe(Infinity);
  });
});
