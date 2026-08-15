import { getDictionary } from "../../i18n/get-dictionary";
import { HomePageContent } from "../../components/HomePageContent";
import { createHomeMetadata } from "../(helpers)/locale-metadata";

const LOCALE = "en" as const;

export const generateMetadata = createHomeMetadata(LOCALE);

export default function RootHomePage() {
  const dictionary = getDictionary(LOCALE);

  return <HomePageContent dictionary={dictionary} />;
}
