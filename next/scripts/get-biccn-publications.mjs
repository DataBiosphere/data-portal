import { promises as fsp } from "fs";
import got, { HTTPError } from "got";

const DOIS = [
  "10.1126/science.add7046",
  "10.1126/science.adf7044",
  "10.1126/science.adf5357",
];

const PUBLICATIONS_PATH = "constants/publications.json";

getPublications();

async function getPublications() {
  const publicationsByDoi = JSON.parse(
    await fsp.readFile(PUBLICATIONS_PATH, "utf8")
  );

  for (const doi of DOIS) {
    if (publicationsByDoi[doi] === undefined)
      publicationsByDoi[doi] = await getPublication(doi);
  }

  await fsp.writeFile(
    PUBLICATIONS_PATH,
    JSON.stringify(publicationsByDoi, undefined, 2) + "\n"
  );

  console.log(`Wrote ${PUBLICATIONS_PATH}`);
}

async function getPublication(doi) {
  try {
    console.log(`Getting publication for ${doi}`);
    const response = await got(
      `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
      {
        responseType: "text",
      }
    );
    const {
      author,
      ["container-title"]: containerTitle,
      institution,
      published,
      ["short-container-title"]: shortContainerTitle,
      title: [title],
    } = JSON.parse(response.body).message;
    const journal =
      shortContainerTitle[0] || containerTitle[0] || institution?.[0].name;
    if (!journal) throw new Error("No journal name found");
    return {
      authors: author.map((a) => a.name || `${a.given} ${a.family}`),
      journal,
      title,
      year: published["date-parts"][0][0],
    };
  } catch (e) {
    if (
      !(
        e instanceof HTTPError &&
        e.code === "ERR_NON_2XX_3XX_RESPONSE" &&
        e.response.statusCode === 404
      )
    ) {
      console.warn(`Error while querying DOI ${doi} - `, e);
    }
    return null;
  }
}
