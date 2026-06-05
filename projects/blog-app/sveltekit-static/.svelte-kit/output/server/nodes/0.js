import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.5dh3dJ4C.js","_app/immutable/chunks/DyO6QDcf.js","_app/immutable/chunks/D_dT1I5l.js","_app/immutable/chunks/DXzRz310.js","_app/immutable/chunks/BU3rizmX.js","_app/immutable/chunks/C8_Y20vK.js","_app/immutable/chunks/DQjoMoN5.js","_app/immutable/chunks/D-upMlrd.js","_app/immutable/chunks/Db2c_BOO.js","_app/immutable/chunks/H4Ce3rFx.js","_app/immutable/chunks/4PNl8qPg.js","_app/immutable/chunks/DCJoYCn-.js","_app/immutable/chunks/BG9z-kpy.js","_app/immutable/chunks/-UyI9lYi.js"];
export const stylesheets = ["_app/immutable/assets/0.hO5E0XKp.css"];
export const fonts = [];
