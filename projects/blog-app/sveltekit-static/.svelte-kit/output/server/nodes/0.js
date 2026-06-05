import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C15XZ3_o.js","_app/immutable/chunks/CJb77jV1.js","_app/immutable/chunks/RwmTlb80.js","_app/immutable/chunks/DEkGS8XT.js","_app/immutable/chunks/B27aEnxn.js","_app/immutable/chunks/Cdg5uNHR.js"];
export const stylesheets = [];
export const fonts = [];
