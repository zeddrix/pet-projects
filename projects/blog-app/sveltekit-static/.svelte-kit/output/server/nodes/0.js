import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.32q8MfOf.js","_app/immutable/chunks/DbAw6lnl.js","_app/immutable/chunks/CkdSdq2q.js","_app/immutable/chunks/D2YbNvBH.js","_app/immutable/chunks/BYNAuki9.js","_app/immutable/chunks/DQlN-0uG.js","_app/immutable/chunks/DtuK_onk.js","_app/immutable/chunks/pbxhCY5u.js","_app/immutable/chunks/SNw2J97p.js","_app/immutable/chunks/D4N44O2P.js","_app/immutable/chunks/sZ_BMHrF.js","_app/immutable/chunks/28Sa0woH.js","_app/immutable/chunks/-UyI9lYi.js"];
export const stylesheets = ["_app/immutable/assets/0.DA42SQ6O.css"];
export const fonts = [];
