import React from "react";
import { useNetwork } from "../../../../../../contexts/networkContext";
import { ProjectsTable } from "./projectsTable";

export const MainColumn = (): JSX.Element => {
  const { network, projects } = useNetwork();
  const { path } = network;
  return <ProjectsTable networkPath={path} projects={projects} />;
};
