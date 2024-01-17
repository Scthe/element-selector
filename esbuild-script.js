// import * as esbuild from "esbuild";
const esbuild = require('esbuild');
const copyStaticFiles = require('esbuild-copy-static-files');

const config = {
  entryPoints: ['./src/index.js'],
  bundle: true,
  outdir: './build',
  define: {},
  // preact
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  // plugins
  plugins: [
    copyStaticFiles({
      src: './public',
      dest: './build',
      dereference: true,
      errorOnExist: false,
      recursive: true,
    }),
  ],
};

const defineProductionFlag = (flag) =>
  (config.define.IS_PRODUCTION = String(flag));

async function buildProd() {
  console.log('Executing prod build');
  defineProductionFlag(true);

  config.minify = true;
  config.format = 'esm';
  config.sourcemap = true;
  config.target = 'chrome100,firefox100,safari15'.split(',');
  await esbuild.build(config);
}

async function startDev() {
  console.log('Starting dev server');
  defineProductionFlag(false);

  let ctx = await esbuild.context(config);
  await ctx.watch();

  let { host, port } = await ctx.serve({
    servedir: 'build',
  });
  console.log(`Serve: http://localhost:${port}/`);
}

const isDev = process.argv.some((e) => e == '--dev');
if (isDev) {
  startDev();
} else {
  buildProd();
}
