/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal analysis detail component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Markdown from "../markdown/markdown";
import { Relationship } from "../../utils/anchor/relationship.model";
import { Target } from "../../utils/anchor/target.model";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./analysisDetail.module.css";
import * as fontStyles from "../../styles/fontsize.module.css";
import * as globalStyles from "../../styles/global.module.css";

function AnalysisDetail(props) {
  const { data } = props,
    { frontmatter, htmlAst } = data,
    { author, githubUrl, title } = frontmatter;
  const buttonClassNames = classNames(
    globalStyles.button,
    globalStyles.outline,
    globalStyles.primary
  );

  return (
    <div>
      <div className={compStyles.hcaAnalyzeDetail}>
        <div>
          <h1>{title}</h1>
          <p className={classNames(fontStyles.s, compStyles.author)}>
            {author}
          </p>
        </div>
        {githubUrl ? (
          <a
            className={buttonClassNames}
            href={githubUrl}
            rel={Relationship.NOOPENER}
            target={Target.BLANK}
          >
            View
          </a>
        ) : null}
      </div>
      <Markdown>{htmlAst}</Markdown>
    </div>
  );
}

export default AnalysisDetail;
