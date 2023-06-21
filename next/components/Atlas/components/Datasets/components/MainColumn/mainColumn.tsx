import React from "react";
import { useAtlas } from "../../../../../../contexts/atlasContext";
import { ProjectsTable } from "../../../../../Network/components/Datasets/components/MainColumn/projectsTable";

export const MainColumn = (): JSX.Element => {
  const { network, projects } = useAtlas();
  const { path } = network;

  return <ProjectsTable networkPath={path} projects={projects} />;
};
