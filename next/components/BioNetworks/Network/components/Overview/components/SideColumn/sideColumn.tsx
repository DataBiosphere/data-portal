import { KeyValuePairs } from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { Sections } from "@clevercanary/data-explorer-ui/lib/components/common/Sections/sections";
import React from "react";
import { useNetwork } from "../../../../../../../contexts/networkContext";
import { getNetworkSummaryKeyValuePairs } from "../../../../../../../viewModelBuilders/viewModelBuilders";
import { Coordinators } from "../../../../../../common/Section/components/Coordinators/coordinators";
import { Section } from "../../../../../../common/Section/components/Coordinators/coordinators.styles";
import { KeyElType } from "./components/Summary/components/KeyElType/keyElType";
import { KeyValuesElType } from "./components/Summary/components/KeyValuesElType/keyValuesElType";
import { ValueElType } from "./components/Summary/components/ValueElType/valueElType";

export const SideColumn = (): JSX.Element => {
  const { network } = useNetwork();
  const {
    contact: { email },
    coordinators,
  } = network;
  return (
    <Sections>
      {/* Summary */}
      <Section>
        <KeyValuePairs
          KeyElType={KeyElType}
          KeyValuesElType={KeyValuesElType}
          keyValuePairs={getNetworkSummaryKeyValuePairs(network)}
          ValueElType={ValueElType}
        />
      </Section>
      {/* Network Coordinators */}
      <Coordinators
        coordinators={coordinators}
        email={email}
        title={"Network Coordinators"}
      />
    </Sections>
  );
};
