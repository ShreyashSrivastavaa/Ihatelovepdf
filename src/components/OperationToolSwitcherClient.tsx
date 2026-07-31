'use client';

import { useDictionary } from '../i18n/LocaleProvider';
import ToolSwitcher, { type ToolLink } from './ToolSwitcher';

export default function OperationToolSwitcherClient({ activeKey }: { activeKey: string }) {
  const dictionary = useDictionary();
  const routes = dictionary.routes;
  const ops = dictionary.components.footer.operations;

  const tools: ToolLink[] = [
    { key: 'merge',       label: ops.merge,       href: routes.operations.merge },
    { key: 'compress',    label: ops.compress,    href: routes.operations.compress },
    { key: 'split',       label: ops.split,       href: routes.operations.split },
    { key: 'extract',     label: ops.extract,     href: routes.operations.extract },
    { key: 'crop',        label: ops.crop,        href: routes.operations.crop },
    { key: 'rotate',      label: ops.rotate,      href: routes.operations.rotate },
    { key: 'reorder',     label: ops.reorder,     href: routes.operations.reorder },
    { key: 'pdfToImages', label: ops.pdfToImages, href: routes.operations.pdfToImages },
    { key: 'imagesToPdf', label: ops.imagesToPdf, href: routes.operations.imagesToPdf },
  ];

  return <ToolSwitcher tools={tools} activeKey={activeKey} />;
}
