import { promises as fsp } from "fs";
import got, { HTTPError } from "got";
import { BICCNPublication, CrossrefWork } from "../@types/network";

interface PublicationInfo {
  authors: string[];
  journal: string;
  title: string;
  year: number;
}

const PUBLICATIONS_PATH = "constants/biccn-publications.json";

getPublications();

async function getPublications(): Promise<void> {
  const biccnPublications = JSON.parse(
    await fsp.readFile(PUBLICATIONS_PATH, "utf8")
  ) as Record<
    string,
    (Partial<BICCNPublication> & Pick<BICCNPublication, "doi">)[]
  >;

  for (const publications of Object.values(biccnPublications)) {
    for (const publication of publications) {
      if (publication.title === undefined) {
        // If title is missing, add info from Crossref
        const info = await getPublication(publication.doi);
        if (info === null)
          throw new Error(`Publication unavailable for ${publication.doi}`);
        Object.assign(publication, info);
      }
    }
  }

  await fsp.writeFile(
    PUBLICATIONS_PATH,
    JSON.stringify(biccnPublications, undefined, 2) + "\n"
  );

  console.log(`Wrote ${PUBLICATIONS_PATH}`);
}

async function getPublication(doi: string): Promise<PublicationInfo | null> {
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
    } = JSON.parse(response.body).message as CrossrefWork;
    const journal =
      containerTitle[0] || shortContainerTitle[0] || institution?.[0].name;
    if (!journal) throw new Error("No journal name found");
    return {
      authors: author.map((a) =>
        "name" in a ? a.name : `${a.given} ${a.family}`
      ),
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
