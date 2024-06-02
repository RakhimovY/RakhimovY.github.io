import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import localeKZ from '@angular/common/locales/ru-KZ';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpBackend,
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { routes } from './app.routes';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';

function HttpLoaderFactory(httpHandler: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader(
    new HttpClient(httpHandler),
    '../assets/i18n/',
    '.json',
  );
}

registerLocaleData(localeKZ);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-KZ' },
    provideClientHydration(),
    importProvidersFrom([
      RouterModule.forRoot(routes),
      TranslateModule.forRoot({
        defaultLanguage: 'ru',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
      }),
    ]),
    provideHttpClient(withInterceptors([])),
    provideAnimations(), // required animations providers
  ],
};
