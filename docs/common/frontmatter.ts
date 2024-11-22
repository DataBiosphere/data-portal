export type Frontmatter = DefaultFrontmatter;

export interface DefaultFrontmatter {
  description: string;
  hidden?: boolean;
  outlineMaxDepth?: number;
  title: string;
}
