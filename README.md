<h1 align="center">routecause</h1>

> Route Cause Website

### Install npm Packages

```console
npm i
```

### Install Ruby Gems

```console
bundle
```

## Usage

The `src` directory contains the Vue application and its components. Create single file components and mount them anywhere in your Jekyll pages, including layouts, markdown pages, or includes.

### Development

To run the jekyll-vue-template in a development environment, first compile assets with webpack:

```console
npm run dev
```

Alternatively you can use the `watch` command to watch for changes in your webpack-managed assets and automatically recompile.

```console
npm run watch
```

After assets have been built, spool up a development server with Jekyll:

```console
bundle exec jekyll s
```

### Production

To build for production, first compile webpack assets:

```console
npm run build
```

After assets have been built, generate the static files with Jekyll:

```console
bundle exec jekyll build
```
