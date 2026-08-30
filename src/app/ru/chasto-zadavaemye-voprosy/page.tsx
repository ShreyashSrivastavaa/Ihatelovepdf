import { FaqPageContent } from "../../../components/FaqPageContent";
import { createFaqMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "ru" as const;

export const generateMetadata = createFaqMetadata(LOCALE);

export default function FaqPage() {
  return <FaqPageContent />;
}
