import { buildVersionedFileName, splitFileName } from "@/utils/trackerNetwork";

describe("buildVersionedFileName", () => {
  it("inserts -r<revision> between the stem and the extension", () => {
    expect(buildVersionedFileName("myeloid_cap_250923.h5ad", 1)).toBe(
      "myeloid_cap_250923-r1.h5ad"
    );
  });

  it("appends -r<revision> to a name with no extension", () => {
    expect(buildVersionedFileName("README", 2)).toBe("README-r2");
  });

  it("inserts -r<revision> before the last dot only", () => {
    expect(buildVersionedFileName("atlas.v2.h5ad", 3)).toBe("atlas.v2-r3.h5ad");
  });
});

describe("splitFileName", () => {
  it("splits a name into stem and extension", () => {
    expect(splitFileName("myeloid_cap_250923.h5ad")).toEqual({
      ext: ".h5ad",
      stem: "myeloid_cap_250923",
    });
  });

  it("returns an empty extension for a name with no dot", () => {
    expect(splitFileName("README")).toEqual({ ext: "", stem: "README" });
  });

  it("splits at the last dot", () => {
    expect(splitFileName("atlas.v2.h5ad")).toEqual({
      ext: ".h5ad",
      stem: "atlas.v2",
    });
  });
});
