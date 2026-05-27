// Entry point — wire every module together.
import { initCursor }    from './cursor.js';
import { initReveal }    from './reveal.js';
import { initStations }  from './stations.js';
import { initCouch }     from './couch.js';
import { initScripture } from './scripture.js';

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initReveal();
  initStations();
  initCouch();
  initScripture();
});
