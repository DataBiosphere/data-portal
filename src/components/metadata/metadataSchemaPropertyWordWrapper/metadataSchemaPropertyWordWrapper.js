/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property word wrapper component.
 * Wraps any length property value e.g. name, data type at convenient break points like "_" or ".".
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataSchemaPropertyWordWrapper.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

class MetadataSchemaPropertyWordWrapper extends React.Component {
  render() {
    const { children, font, word, wrap } = this.props;
    const stackWords = word.split(".");
    const wordDepth = stackWords.length - 1;
    const classNamesWordWrapper = classNames(
      { [fontStyles[font]]: !!font },
      { [compStyles.stack]: !wrap },
      { [compStyles.wrap]: wrap }
    );

    const StackWord = props => {
      const { children, counter, word, wordDepth } = props;
      const firstStack = counter === 0;
      const lastStack = counter === wordDepth;
      const wrapWords = word.split("_");
      return (
        <span className={compStyles.wrap}>
          {wrapWords.map((word, w) => (
            <WrapWord key={w} counter={w} firstStack={firstStack} word={word} />
          ))}
          {lastStack ? children : null}
        </span>
      );
    };

    const WrapWord = props => {
      const { counter, firstStack, word } = props;
      const showDot = counter === 0 && !firstStack;
      const showSeparator = counter !== 0;
      return (
        <>
          {showDot ? <span>.</span> : null}
          {showSeparator ? (
            <span>
              <span>_</span>
              <span>{word}</span>
            </span>
          ) : (
            <span>{word}</span>
          )}
        </>
      );
    };

    return (
      <span className={classNamesWordWrapper}>
        {stackWords.map((word, s) => (
          <StackWord
            key={s}
            children={children}
            counter={s}
            word={word}
            wordDepth={wordDepth}
          />
        ))}
      </span>
    );
  }
}

export default MetadataSchemaPropertyWordWrapper;
