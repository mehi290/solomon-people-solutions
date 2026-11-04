import { describe, expect, it } from "vitest";
import { headlineFor, isFreeEmail, leadQuality } from "@/lib/sps";

describe("lead qualification", () => {
  it("qualified when size 51+, participants 6+, not just exploring", () => {
    expect(leadQuality("51 to 200", "6 to 15", "This month")).toBe("qualified");
  });
  it("standard when company is 1 to 50", () => {
    expect(leadQuality("1 to 50", "30+", "This month")).toBe("standard");
  });
  it("standard when 1 to 5 participants", () => {
    expect(leadQuality("1,000+", "1 to 5", "This month")).toBe("standard");
  });
  it("standard when just exploring", () => {
    expect(leadQuality("1,000+", "30+", "Just exploring")).toBe("standard");
  });
});

describe("work email", () => {
  it("rejects free providers", () => {
    for (const d of ["gmail.com", "yahoo.co.uk", "hotmail.com", "outlook.com", "icloud.com", "live.com"])
      expect(isFreeEmail(`a@${d}`)).toBe(true);
  });
  it("accepts company domains", () => {
    expect(isFreeEmail("a@acme.ae")).toBe(false);
  });
});

describe("headline", () => {
  it("matches topic", () => {
    expect(headlineFor("sales")).toBe("Sales and customer service training that lifts team performance");
    expect(headlineFor("other")).toBe("Corporate training programmes for UAE companies");
  });
});
