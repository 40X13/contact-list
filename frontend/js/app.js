import {parseRequestURL} from './helpers/utils.js';

import Login from "./views/pages/log-in.js";
import AddAndList from "./views/pages/contacts/add-and-list.js";
import Error404 from "./views/pages/error-404.js";
import Info from "./views/pages/contacts/info.js";

const Routes = {
    '/': Login,
    '/contacts': AddAndList,
    '/contact/:id': Info,
};

const router = async () => {
    const contentContainer = document.getElementsByClassName('content-container')[0];

    const request = parseRequestURL();
    const parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`;
    const page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    const data = await page.getData();
    const html = (await page.render(data)).toString();
    contentContainer.innerHTML = html;
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);