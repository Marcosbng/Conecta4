import {generarLogin} from '../views/login.js';
import {generarRegistro} from '../views/register.js';
import {generar4EnRaya} from "../views/cuatroView.js";
import {generarHome} from "../views/home";
import {profileForm} from "../views/profile.js";

export {router};

const router = async (ruta) => {

    let contenedor = document.querySelector("#main");
    let id = ruta.split("?")[1];
    ruta = ruta.split("?")[0];
    switch (ruta) {
        case '#/':
            contenedor.innerHTML = '';
            contenedor.append(generarHome());
            break;
        case  '#/top':
            contenedor.innerHTML = '';
            break
        case '#/login':
            contenedor.innerHTML = '';
            contenedor.append(generarLogin());
            break;
        case '#/register':
            contenedor.innerHTML = '';
            contenedor.append(generarRegistro());
            break;
        case '#/4enRaya':
            contenedor.innerHTML = '';
            contenedor.append(generar4EnRaya(id));
            break;
        case '#/profile':
            contenedor.innerHTML = '';
            contenedor.append(profileForm());
            break;
        default:
            window.location.hash = '#/';
    }
};

