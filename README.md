# AngularTemplate

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.

## Quality Code

`ng add @angular-eslint/schematics`
`npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import --save-dev`
`npx eslint --init`

`eslint.config.js`

```
// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
  }
);
```

`npm install prettier --save-dev`

`.prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80
}
```

`package.json`

```
    "lint:hook": "ng lint --quiet --fix",
```

`npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/commit-analyzer @semantic-release/release-notes-generator`

`.releaserc`

```
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/git"
  ]
}
```

`npm install --save-dev @commitlint/cli`
`npm install --save-dev @commitlint/config-conventional`

`echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js`

`npm install --save-dev commitizen cz-customizable`

`package.json`

```
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}
```

`.cz-config.js`

```
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Une nouvelle fonctionnalité' },
    { value: 'fix', name: 'fix:      Correction d\'un bug' },
    { value: 'docs', name: 'docs:     Documentation' },
    { value: 'style', name: 'style:    Modifications de formatage (pas de code fonctionnel)' },
    { value: 'refactor', name: 'refactor: Refactoring de code' },
    { value: 'perf', name: 'perf:     Amélioration des performances' },
    { value: 'test', name: 'test:     Ajout de tests' },
    { value: 'chore', name: 'chore:    Modifications mineures (outils, configuration)' },
    { value: 'revert', name: 'revert:   Revertir un commit précédent' }
  ],
  messages: {
    type: "Quel type de changement avez-vous effectué ?",
    subject: "Quelle est la portée de votre changement ?"
  }
};
```

`npm install husky --save-dev`

`.husky/commit-msg`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

`.husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:hook
npx --no-install prettier --write .
```

`chmod +x .husky/*`

pour commiter :

`npx git-cz`

Pour faire une release :

`npx semantic-release`

## Test Unitaire

`package.json`

```
  "scripts": {
    "test:hook": "ng test  --code-coverage --watch=false --browsers=ChromeHeadless",
  },
```

`.husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run test:hook
npm run lint:hook
npx --no-install prettier --write .
```

## Test Cypress

`npm install cypress --save-dev`
`npm install start-server-and-test -D ng add @cypress/schematic`
`npx cypress open`

`package.json`

```
"scripts": {
  "cy:run": "cypress run --browser chrome",
  "cy:serve": "ng serve",
  "cy:hook": "start-server-and-test cy:serve http://localhost:4200 cy:run",
}
```

`cypress/e2e/app/app.cy.ts`

```
describe('My first test', () => {
  it('Access Page', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Hello');
  });
});
```

`.husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run test:hook
npm run cy:hook
npm run lint:hook
npx --no-install prettier --write .
```

## CI

`.github/workflows/ci.yml`

```yaml
name: CI
on: push
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout ⬇️
        uses: actions/checkout@v2
      - name: Setup 🔧
        uses: actions/setup-node@v2
        with:
          node-version: 22.13.0
          cache: 'npm'
      - name: Install ⚙️
        run: npm ci
      - name: Build 🛠
        run: npm run build:ci
      - name: Test Unitaire ✅
        run: npm run test:ci
      - name: Test e2e 🧪
        run: npm run cy:ci
```

`package.json`

```json
"script" :{
"build:ci": "ng build --aot true --configuration=production",
"test:ci": "ng test  --code-coverage --watch=false --browsers=ChromeHeadless",
"cy:ci": "start-server-and-test cy:serve http://localhost:4200 cy:run",
}
```

## i18n

`npm install @ngx-translate/core @ngx-translate/http-loader @colsen1991/ngx-translate-extract-marker`

`app.config.ts`

```typescript
...
import {provideHttpClient} from "@angular/common/http";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    ...
      provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
};
```

`ng g s core/utils/services/language`

```typescript
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

export type Language = 'fr' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _currentLang = new BehaviorSubject<Language>('en');
  currentLang$ = this._currentLang.asObservable();

  constructor(private _translate: TranslateService) {
    this._translate.addLangs(['fr', 'en']);
    this._translate.setDefaultLang('fr');
    const storedLang: Language =
      (localStorage.getItem('lang') as Language) || 'fr';
    this.loadLanguage();
  }

  loadLanguage(): void {
    this.setLanguage(this.getLanguageInLocalStorage());
  }

  changeLanguage(lang: Language): void {
    console.log(lang);
    this.setLanguage(lang);
    this.setLanguageInLocalStorage(lang);
  }

  setLanguage(lang: Language): void {
    console.log(
      'setLanguage',
      lang,
      this._translate.currentLang,
      this._translate.defaultLang
    );
    this._currentLang.next(lang);
    this._translate.use(lang);
  }

  getLanguage(): BehaviorSubject<Language> {
    return this._currentLang;
  }

  setLanguageInLocalStorage(lang: Language): void {
    localStorage.setItem('lang', lang);
  }

  getLanguageInLocalStorage(): Language {
    return (localStorage.getItem('lang') as Language) ?? 'fr';
  }
}
```

## http-request service

`ng g s core/utils/services/http-request`

```typescript
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(private _http: HttpClient) {
  }

  /**
   * Get All datas or a spécific data
   * @param route
   * @param params
   */
  public getDatas<T>(route: string, params?: HttpParams): Observable<T> {
    if (params) {
      return this._http.get<T>(route, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.get<T>(route, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * GET by id
   * @param route
   * @param id
   * @param params
   */
  public getById<T>(route: string, id: number, params?: HttpParams): Observable<T> {
    const url = `${route}/${id}`;
    if (params) {
      return this._http.get<T>(url, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.get<T>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Post datas
   * @param route
   * @param datasToPost
   * @param params
   */
  public postDatas<T>(route: string, datasToPost: T, params?: HttpParams): Observable<T> {
    if (params) {
      return this._http.post<T>(route, datasToPost, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.post<T>(route, datasToPost, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Delete id datas
   * @param route
   * @param id
   * @param params
   */
  public deleteDatas(route: string, id: number, params?: HttpParams): Observable<unknown> {
    const url = `${route}/${id}`;
    if (params) {
      return this._http.delete(url, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * PUT datas
   * @param route
   * @param datasToPut
   * @param params
   */
  public updateDatas<T>(route: string, datasToPut: T, params?: HttpParams): Observable<T> {
    if (params) {
      return this._http.put<T>(route, datasToPut, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.put<T>(route, datasToPut, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}

```

## Docker

`Dockerfile`

```
# Étape 1 : Construire l'application Angular
FROM node:latest AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 1 : Utiliser l'image officielle d'Apache
FROM httpd:alpine

# Étape 2 : Copier les fichiers construits de l'application Angular dans le répertoire approprié d'Apache
COPY --from=build /app/dist/angular-template/browser /usr/local/apache2/htdocs/

# Étape 3 : Copier le fichier .htaccess dans le répertoire de l'application Angular pour le routage côté client
COPY ./.htaccess /usr/local/apache2/htdocs/

# Exposer le port 80
EXPOSE 80
```

`docker-compose.yml`

```yaml
version: '3.8'

services:
  angular-template:
    build: .
    ports:
      - "80:80"

```

`.htaccess`

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# not rewrite css, js and images
RewriteCond %{REQUEST_URI} !\.(?:css|js|map|jpe?g|gif|png)$ [NC]
RewriteRule ^(.*)$ /index.html?path=$1 [NC,L,QSA]

```

`docker-compose up --build`

## NgPrime

`npm install primeng @primeng/themes`
`npm install primeicons`
`npm install -D tailwindcss postcss autoprefixer`
`npx tailwindcss init`
`npm i tailwindcss-primeui`

`app.config.ts`

```typescript
...
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {definePreset} from '@primeng/themes';


export const appConfig: ApplicationConfig = {
  providers: [
    ...
      providePrimeNG({
        theme: {
          preset: definePreset(Aura, {
            semantic: {
              primary: {
                50: '{rose.50}',
                100: '{rose.100}',
                200: '{rose.200}',
                300: '{rose.300}',
                400: '{rose.400}',
                500: '{rose.500}',
                600: '{rose.600}',
                700: '{rose.700}',
                800: '{rose.800}',
                900: '{rose.900}',
                950: '{rose.950}',
              },
            },
          }),
        },
      }),
  ],
};

```

## icons

`npm install @ng-icons/core`
`npm install @ng-icons/huge-icons`

## error page

`ng g interceptor core/utils/interceptors/http-error`

```typescript
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status === 503) {
        router.navigate(['/page-unauthorized']);
      }
    }),
    catchError((error) => {
      console.error('Erreur HTTP:', error);
      return throwError(error);
    })
  );
};

```

`app.routes.ts`

```typescript
  {
  path: 'page-unauthorized',
    component
:
  PageUnauthorizedComponent,
}

```

`ng g c core/ui/pages/page-not-found`
`ng g c core/ui/pages/page-unauthorised`

## Message

`ng g interface core/ui/interfaces/loader`

```typescript
export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface Message {
  title: string;
  type: MessageType;
  subtitle?: string;
  duration?: number; // Durée de l'affichage du message, en millisecondes
  undoable?: boolean; // Si un bouton Undo doit être affiché
  startTime?: number; // Initialisation du startTime
  progress?: number;
}

```

`ng g s core/ui/services/message`

```typescript
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message, MessageType} from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _messagesSubject = new Subject<Message | null>();
  public messages$ = this._messagesSubject.asObservable(); // Observable des messages

  showMessage(
    title: string,
    type: MessageType,
    subtitle = '',
    duration = 3000,
    undoable = false
  ): void {
    const message: Message = {
      title,
      type,
      subtitle,
      duration,
      undoable,
      startTime: Date.now(),
    };
    this._messagesSubject.next(message);
    setTimeout(() => this.clearMessage(), duration);
  }

  private clearMessage(): void {
    this._messagesSubject.next(null);
  }
}

```

`ng g c core/ui/components/message`

## Loader

https://codepen.io/sohrabzia/pen/XJrrgKw

`ng g interface core/ui/interfaces/loader`

```typescript
export interface Loader {
  show: boolean;
}

```

`ng g s core/ui/services/loader`

```typescript
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Loader} from '../interfaces/loader';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader: Subject<Loader> = new Subject<Loader>();
  public loaderState = this._loader.asObservable();

  /**
   * show the loader
   */
  public show(): void {
    this._loader.next(<Loader>{show: true});
  }

  /**
   * hide the loader
   */
  public hide(): void {
    this._loader.next(<Loader>{show: false});
  }
}

```

`ng g c core/ui/components/loader`

## Theme

https://preview.themeforest.net/item/matdash-tailwind-react-admin-template/full_screen_preview/55787128?_ga=2.139668918.428557748.1737843891-2084262383.1737723792
https://dash-tail.vercel.app/en/dashboard

https://react.vristo.sbthemes.com/
https://www.einfosoft.com/templates/admin/loraxangular/source/light/#/dashboard/main
https://preview.themeforest.net/item/tagus-material-design-angular-admin-dashboard-template/full_screen_preview/44378496?_ga=2.253348364.428557748.1737843891-2084262383.1737723792
https://angular.envytheme.com/tagus/contacts-list
https://angular.envytheme.com/trinta/
https://www.einfosoft.com/templates/admin/spire/source/light/#/dashboard/dashboard1
https://www.einfosoft.com/templates/admin/axen/source/light/#/dashboard/main
https://matdash-angular-main.netlify.app/dashboards/dashboard1

https://handsontable.com/docs/javascript-data-grid/

npm i ngx-scrollbar @angular/cdk

## Commit

```bash
npx git-cz
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
