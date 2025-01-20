# AngularTemplate

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.

## Quality Code

`ng add @angular-eslint/schematics`
`npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import --save-dev`
`npx eslint --init`
`npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev`

`.prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80
}
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

npx --no-install prettier --write .
```

`chmod +x .husky/*`

pour commiter :

`npx git-cz`

Pour faire une release :

`npx semantic-release`

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
