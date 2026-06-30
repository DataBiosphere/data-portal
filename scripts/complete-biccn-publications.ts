import { promises as fsp } from "fs";
import got, { HTTPError } from "got";
import { decode } from "html-entities";
import { BICCNPublication, CrossrefWork } from "../@types/network";

interface PublicationInfo {
  authors: string[];
  journal: string;
  title: string;
  year: number;
}

const PUBLICATIONS_PATH = "constants/biccn-publications.json";

// Maps characters to their Unicode subscript equivalents. "−" is the Unicode
// minus sign (U+2212), which entities such as &minus; decode to.
const SUBSCRIPTS: Record<string, string> = {
  "(": "₍",
  ")": "₎",
  "+": "₊",
  "-": "₋",
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  "=": "₌",
  "−": "₋",
};

// Maps characters to their Unicode superscript equivalents. "−" is the Unicode
// minus sign (U+2212), which entities such as &minus; decode to.
const SUPERSCRIPTS: Record<string, string> = {
  "(": "⁽",
  ")": "⁾",
  "+": "⁺",
  "-": "⁻",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "=": "⁼",
  n: "ⁿ",
  "−": "⁻",
};

getPublications();

/**
 * Sanitizes a Crossref-supplied title for plain-text rendering. HTML entities
 * are decoded first (so entity-encoded markup is handled the same as literal
 * markup), then superscript/subscript tags are mapped to Unicode where possible
 * (e.g. Ca<sup>2+</sup> -> Ca²⁺), remaining HTML tags are stripped (italic
 * species names lose styling but stay readable), and whitespace is collapsed.
 * Applied once to each title when it is first fetched from Crossref.
 * @param raw - Raw Crossref title.
 * @returns sanitized title.
 */
function cleanTitle(raw: string): string {
  // Decode entities exactly once (standard HTML semantics); strict scope
  // requires a terminating ";", so ampersand-prefixed prose (e.g. "Tom&notit")
  // is left intact rather than greedily matched to a legacy entity.
  const decoded = decode(raw, { scope: "strict" });
  const withScripts = mapScriptTags(decoded);
  // Strip HTML tags only — the leading tag-name letter prevents inequality
  // operators (e.g. "regions <0.5 mm and >2 mm") from being deleted.
  const withoutTags = withScripts.replace(/<\/?[a-z][^<>]*>/gi, "");
  return withoutTags.replace(/\s+/g, " ").trim();
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
    // Crossref titles can contain markup (e.g. <sup>, <i>) and HTML entities;
    // cleanTitle normalises them for the plain-text Publications UI.
    const journal =
      containerTitle[0] || shortContainerTitle[0] || institution?.[0].name;
    if (!journal) throw new Error("No journal name found");
    if (!title) throw new Error("No title found");
    return {
      authors: author.map((a) =>
        "name" in a ? a.name : `${a.given} ${a.family}`
      ),
      journal,
      title: cleanTitle(title),
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
        // If title is missing, add info from Crossref (title sanitized there).
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

/**
 * Maps superscript and subscript tags to their Unicode equivalents, falling
 * back to the tag's text content when a character has no Unicode equivalent.
 * @param value - Value containing sup/sub markup.
 * @returns value with sup/sub markup mapped to Unicode.
 */
function mapScriptTags(value: string): string {
  return value
    .replace(
      /<sup>([^<]*)<\/sup>/gi,
      (_match, content) => toUnicodeScript(content, SUPERSCRIPTS) ?? content
    )
    .replace(
      /<sub>([^<]*)<\/sub>/gi,
      (_match, content) => toUnicodeScript(content, SUBSCRIPTS) ?? content
    );
}

/**
 * Maps each character of the given content to its Unicode equivalent, or null
 * if any character is unmappable.
 * @param content - Tag text content.
 * @param map - Character-to-Unicode map.
 * @returns mapped content, or null when any character is unmappable.
 */
function toUnicodeScript(
  content: string,
  map: Record<string, string>
): string | null {
  let result = "";
  // Trim surrounding whitespace (e.g. "<sup> + </sup>"); internal whitespace
  // is left in place so spaced tokens fall back to plain text rather than merge.
  for (const char of content.trim()) {
    if (!(char in map)) return null;
    result += map[char];
  }
  return result;
}
