import type { Project, SkillCategory } from "@/types/portfolio";

export interface ToolGroup { projectId: string | null; tools: string[] }

export const toolKey = (name: string) => name.replace(/\(.*?\)/g, "").replace(/\s+\d+(\.\d+)*$/, "").trim().toLowerCase();

export function pickedUp(projects: Project[], skills: SkillCategory[]): ToolGroup[] {
  const seen = new Set<string>();
  const groups: ToolGroup[] = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].map((project) => {
    const tools = project.stack.filter((tool) => !seen.has(toolKey(tool)) && seen.add(toolKey(tool)));
    return { projectId: project.id, tools };
  });
  const rest = skills.flatMap((c) => c.skills.map((s) => s.name)).filter((name) => !name.split(" / ").some((part) => seen.has(toolKey(part))));
  return [...groups, { projectId: null, tools: rest }].filter((group) => group.tools.length);
}
