import { getDictionary } from '../src/i18n/get-dictionary';
import { Locale } from '../src/i18n/config';

const locales: Locale[] = ['en', 'de', 'es', 'fr', 'hu', 'it', 'pt', 'ro', 'ru'];
for (const loc of locales) {
  const dict = getDictionary(loc);
  console.log(loc, 'operations count:', Object.keys(dict.operations).length, 'wordToPdf?', !!dict.operations.wordToPdf);
}

