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

## Material

`ng add @angular/material`

`ng g s core/ui/services/theme`

```typescript
import {Injectable} from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: Theme = 'light'; // Default theme
  constructor() {
    this.loadTheme();
  }

  toogleTheme() {
    if (this.currentTheme === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  // Function to apply a theme
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }

    // Saving the theme to localStorage
    this.setThemeInLocalStorage(theme);
  }

  setThemeInLocalStorage(theme: Theme): void {
    localStorage.setItem('theme', theme);
  }

  getThemeInLocalStorage(): Theme {
    return (localStorage.getItem('theme') as Theme) ?? 'light';
  }

  // Load saved theme from localStorage
  loadTheme(): void {
    this.setTheme(this.getThemeInLocalStorage());
  }
}

```

`src/app/app.component.html`

```html

<div class="theme-toggle">
  <mat-slide-toggle
    (change)="themeService.toogleTheme()"
    [checked]="isDarkTheme">
    Activer/Désactiver le thème sombre
  </mat-slide-toggle>
</div>
<h1>Hello, {{ title }}</h1>

<router-outlet/>

```

`src/app/app.component.ts`

```typescript
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {ThemeService} from './core/ui/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'angular-template';
  isDarkTheme = false;

  constructor(public themeService: ThemeService) {
    this.isDarkTheme = this.themeService.getThemeInLocalStorage() === 'dark';
  }
}

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
