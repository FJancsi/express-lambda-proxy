import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['./src/index.mjs'],
    entryNames: '[dir]/[name]/index',
    bundle: true,
    sourcemap: true,
    // minify: true,
    outfile: 'dist/index.mjs',
    outExtension: { '.js': '.mjs' },
    format: 'esm',
    target: 'node18',
    platform: 'node',
    banner: {
        js: `
        import path from 'path';
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        `
    }
});
