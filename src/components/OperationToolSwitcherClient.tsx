'use client';

import { useDictionary } from '../i18n/LocaleProvider';
import ToolSwitcher, { type ToolLink } from './ToolSwitcher';
import { TOOL_CATEGORIES } from '../lib/tools-registry';

export default function OperationToolSwitcherClient({ activeKey }: { activeKey: string }) {
  const dictionary = useDictionary();
  const routes = dictionary.routes.operations as Record<string, string>;
  const ops = dictionary.components.footer.operations as Record<string, string>;

  // Build complete list of all 45 tools across all categories
  const tools: ToolLink[] = [];
  const seen = new Set<string>();

  for (const category of TOOL_CATEGORIES) {
    for (const key of category.toolKeys) {
      if (!seen.has(key)) {
        seen.add(key);
        const label = ops[key] || dictionary.operations[key as keyof typeof dictionary.operations]?.hero.title || key;
        const href = routes[key] || `/${key}`;
        tools.push({
          key,
          label,
          href,
          categoryName: category.name,
        });
      }
    }
  }

  return <ToolSwitcher tools={tools} activeKey={activeKey} />;
}
