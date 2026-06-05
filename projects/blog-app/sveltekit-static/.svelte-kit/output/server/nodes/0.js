import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Dic8KuRU.js","_app/immutable/chunks/C414fiGm.js","_app/immutable/chunks/DXr7aD6c.js","_app/immutable/chunks/CGXiyF6O.js","_app/immutable/chunks/Csq7g3-q.js","_app/immutable/chunks/6w3JEWG6.js","_app/immutable/chunks/y9q8h3ym.js","_app/immutable/chunks/DSTWU4l7.js","_app/immutable/chunks/DU9FzRVg.js","_app/immutable/chunks/BwPX4uxo.js","_app/immutable/chunks/P0e4ABbR.js","_app/immutable/chunks/FStKoJ_1.js","_app/immutable/chunks/orTXrHLX.js","_app/immutable/chunks/-UyI9lYi.js"];
export const stylesheets = ["_app/immutable/assets/0.DA42SQ6O.css"];
export const fonts = [];
