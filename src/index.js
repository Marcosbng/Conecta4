import _ from 'lodash';
import './css/style.css';
import './css/styles.scss';
import './css/4enRaya.css';
import * as bootstrap from 'bootstrap';
import {router} from './routers/router.js';
import {menu} from './views/menu.js';

(() => {
    document.addEventListener("DOMContentLoaded", async () => {
        document.querySelector('#menu').innerHTML = menu();
        function manejarCambioRuta() {
            const ruta = window.location.hash;
            router(ruta);
        }
        window.addEventListener('hashchange', manejarCambioRuta);
        manejarCambioRuta();
    });
})();

