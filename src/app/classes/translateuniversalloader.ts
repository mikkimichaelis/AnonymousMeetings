import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import * as contentEnUS from '../../assets/i18n/en-US.json';
import * as contentEs from '../../assets/i18n/es.json';

const TRANSLATIONS = {
  'en-US': contentEnUS,
  'es': contentEs
};

export class TranslateUniversalLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    console.log(TRANSLATIONS[lang].default);
    return of(TRANSLATIONS[lang].default);
  }
}
