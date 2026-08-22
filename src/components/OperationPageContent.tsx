import ToolPageLayout from "./ToolPageLayout";
import PDFProcessor from "./pdf-processor";
import type { OperationContent } from "../i18n/dictionaries/operation-types";

export function OperationPageContent({
  operation,
}: {
  operation: OperationContent;
}) {
  return (
    <ToolPageLayout operation={operation}>
      <PDFProcessor initialMode={operation.mode} />
    </ToolPageLayout>
  );
}
