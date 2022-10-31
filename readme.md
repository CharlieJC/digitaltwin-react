DigitalTwin-React

# Environment vars

This project uses the following environment variables:

| Name                     | Description          |
| ------------------------ | -------------------- |
| REACT_APP_GOOGLE_API_KEY | Google Maps API key  |
| REACT_APP_MAP_ID         | Google maps ID       |
| REACT_APP_API_HOST       | Backend API endpoint |

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

# Getting started

- Clone the repository

```
git clone  https://github.com/CharlieJC/digitaltwin-frontend.git
```

- Install dependencies

```
cd digitaltwin-frontend
npm install
```

- Build and run the project

```
npm start
```

## Getting TypeScript

Add Typescript to project `npm`.

```
npm install -D typescript
```

### Running the build without docker

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description                                 |
| ---------- | ------------------------------------------- |
| `start`    | Default react start script                  |
| `build`    | Default react build script                  |
| `test`     | Default react test script                   |
| `eject`    | Default eject start script                  |
| `lint`     | Run eslint linter                           |
| `lint:fix` | Run eslint linter and attempt to fix errors |
| `format`   | Run prettier to format code                 |
