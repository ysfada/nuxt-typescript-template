# Nuxt TypeScript starter template

![Lighthouse](./static/Lighthouse.png)

A [Nuxt.js](https://github.com/nuxt/nuxt.js) + [@nuxt/typescript](https://github.com/nuxt/typescript) + [@nuxt/composition-api](https://github.com/nuxt-community/composition-api) starter project template.

## Features

- Typescript
- Composition API
- Vuex
- PWA
- SCSS
- Docker
- Socket`.`io
- Express API
- NestJS API

## Deployment

```bash
# install dependencies
$ npm install

# serve nuxt with hot reload at localhost:3000
$ npm run dev:nuxt

# serve nestjs with hot reload at localhost:3333
$ npm run dev:nest

# generate static project
$ npm run generate

# build for production and launch server
$ npm run build
$ npm run start

```

Go to [http://localhost:3000](http://localhost:3000)

For Socket`.`io example go to [http://localhost:3000/chat](http://localhost:3000/chat)

## Docker Deployment

```bash
# build containers
$ docker-compose build

# run containers
$ docker-compose up -d
```

Go to [http://localhost](http://localhost)

Socket`.`io example at [http://localhost:3000/chat](http://localhost:3000/chat)

Express example at [http://localhost:3000/express](http://localhost:3000/express)

NestJS example at [http://localhost:3000/nest](http://localhost:3000/nest)

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org), [Nginx image](https://hub.docker.com/_/nginx) and [Node image](https://hub.docker.com/_/node).

## Roadmap

[-] Test (jest+cypress)

[+] Docker support

[+] Express API example

[+] NestJS API example

[+] Socket`.`io example

## Acknowledgements

- [Create Nuxt App](https://github.com/nuxt/create-nuxt-app)
- [Nuxt Typescript Template](https://github.com/nuxt-community/typescript-template)
- [NestJS Typescript Template](https://github.com/nestjs/typescript-starter)
- [Vuex + TypeScript](https://dev.to/3vilarthas/vuex-typescript-m4j)
- [Express](https://expressjs.com/)
- [The easiest way to create a README](https://readme.so/editor)
- [Create useful .gitignore files for your project](https://www.toptal.com/developers/gitignore)

## License

[MIT](https://choosealicense.com/licenses/mit/)
