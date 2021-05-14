import { Plugin } from "esbuild";

type ExternalPluginOptions = Record<string, string>;

const namespace = 'external-global-plugin';

export const externalGlobalPlugin = (externals: ExternalPluginOptions): Plugin => {
  return {
    name: namespace,
    setup(build) {
      build.onResolve({
        filter: new RegExp('^(' + Object.keys(externals).join('|') + ')$')
      }, (args) => ({
        path: args.path,
        namespace: namespace,
      }));
  
      build.onLoad({
        filter: /.*/,
        namespace
      }, (args) => {
        const contents = `module.exports = ${externals[args.path]}`;
        return {
          contents
        };
      });
    },
  }
};
