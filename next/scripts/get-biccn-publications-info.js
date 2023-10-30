// Run on https://www.biccn.org/science/human-and-nhp-cell-atlas
// Some publications end up with a property keyed by NBSP, which has to be removed manually
Array.from(
  document.querySelectorAll(
    "body > div.outer > div.bcdc-content.medical-home.content-container > div > div:nth-child(2) > div > .row"
  )
)
  .slice(2, 7)
  .flatMap((e) => {
    const section = e.querySelector("h2").textContent;
    return Array.from(e.querySelectorAll(".row")).map((e) =>
      Object.fromEntries(
        [
          ["category", section],
          [
            "doi",
            /DOI:\s+(?:https:\/\/doi.org\/)?(\S+)/i.exec(
              e.children[1].textContent
            )[1],
          ],
          ...Array.from(e.children[2].querySelectorAll("tr")).map((r) => [
            r.children[0].textContent.toLowerCase().replace(/:\s*$/, ""),
            Array.from(r.children[1].querySelectorAll("a")).map((a) => ({
              label: a.textContent,
              url: a.href,
            })),
          ]),
        ].sort(([a], [b]) => a.localeCompare(b))
      )
    );
  });
