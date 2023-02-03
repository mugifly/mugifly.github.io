import { __awaiter } from 'tslib';
import { registerPlugin } from '@scullyio/scully';
import { JSDOM } from 'jsdom';
import * as fs from 'fs/promises';
import { marked } from 'marked';

const Plugin$1 = (dom, route) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!dom)
        return new JSDOM();
    // Find codeblocks recognized by code syntax highlighter
    let codeblocks = dom.window.document.querySelectorAll('code[class^="language-"]');
    for (let i = 0; i < codeblocks.length; i++) {
        let codeblockFileName = null;
        let codeblockFileExtension = null;
        // Find invalid class names
        // (If the class name contains the filename or path not just extension, it will not be recognized correctly by code syntax highlighter.)
        // @ts-ignore
        const targetClassName = Array.from(codeblocks[i].classList).find((className) => {
            if (className.match(/^language-(.+\.(.+))$/)) {
                codeblockFileName = RegExp.$1;
                codeblockFileExtension = RegExp.$2;
                return true;
            }
            return false;
        });
        if (!codeblockFileName || !codeblockFileExtension || !targetClassName)
            continue;
        // Fix the class name
        const validClassName = `language-${codeblockFileExtension}`;
        codeblocks[i].classList.replace(targetClassName, validClassName);
        // Append the filename as a new element
        const filenameLabel = dom.window.document.createElement('span');
        filenameLabel.innerHTML = codeblockFileName;
        filenameLabel.style.background = '#ffffffaa';
        filenameLabel.style.fontSize = '0.6rem';
        filenameLabel.style.padding = '0.2rem 1rem 0.2rem 1rem';
        const filenameLabelContainer = dom.window.document.createElement('div');
        filenameLabelContainer.appendChild(filenameLabel);
        filenameLabelContainer.className = 'esa-codeblock-filename';
        filenameLabelContainer.style.position = 'absolute';
        filenameLabelContainer.style.left = '0px';
        filenameLabelContainer.style.top = '0px';
        filenameLabelContainer.style.lineHeight = '1rem';
        const filenameLabelSpacer = dom.window.document.createElement('div');
        filenameLabelSpacer.style.fontSize = '0.5rem';
        filenameLabelSpacer.innerHTML = '&#8203;'; // zero width space character
        if (codeblocks[i] && codeblocks[i].parentNode && codeblocks[i].parentNode != null) {
            (_a = codeblocks[i].parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(filenameLabelSpacer, codeblocks[i]);
            (_b = codeblocks[i].parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(filenameLabelContainer, codeblocks[i]);
        }
    }
    return dom;
});
registerPlugin('postProcessByDom', 'esaPostProcess', Plugin$1);

const Plugin = (routes, config = {}) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!routes) {
        return [];
    }
    for (let i = 0, l = routes.length; i < l; i++) {
        const route = routes[i];
        if (route.type !== 'contentFolder')
            continue;
        if (route.data === undefined) {
            route.data = {};
        }
        // Remove strange extension (".html") added by esa from the url
        if ((_a = route.templateFile) === null || _a === void 0 ? void 0 : _a.match(/\.html\.md$/)) {
            route.route = route.route.replace(/\.html$/, '');
        }
        // Convert tags string to array
        if (route.data && route.data.tags && typeof route.data.tags == 'string') {
            route.data.tags = route.data.tags.split(/\s*,\s*/);
        }
        // Parse file
        if (route.templateFile && route.templateFile.match(/\.md$/)) {
            try {
                let markdown = yield fs.readFile(route.templateFile, 'utf-8');
                let markdownLines = markdown.split(/\n/);
                let endLineOfMetaData = 0;
                for (let i = 1; i < markdownLines.length; i++) {
                    if (markdownLines[i].match(/^---$/)) {
                        endLineOfMetaData = i;
                        break;
                    }
                }
                markdown = markdownLines.slice(endLineOfMetaData + 1).join('\n');
                const html = marked.parse(markdown);
                const dom = new JSDOM(html);
                // Extract beginning text
                route.data.beginningText = '';
                const paragraphs = dom.window.document.querySelectorAll('p');
                for (let i = 0; i < paragraphs.length; i++) {
                    const paragraph = paragraphs[i];
                    if ((_b = paragraph.textContent) === null || _b === void 0 ? void 0 : _b.length) {
                        route.data.beginningText += paragraph.textContent;
                    }
                    if (route.data.beginningText.length > 200) {
                        break;
                    }
                }
                // Extract images
                route.data.imageUrls = [];
                const imageElems = dom.window.document.querySelectorAll('img');
                for (let i = 0; i < imageElems.length; i++) {
                    const image = imageElems[i];
                    route.data.imageUrls.push(image.src);
                }
            }
            catch (e) {
                console.error(`[EsaRouteProcess]`, e);
            }
        }
        else {
            console.warn(`[EsaRouteProcess]`, 'Could not parse file', route.templateFile);
        }
        routes[i] = route;
    }
    return routes;
});
registerPlugin('routeProcess', 'esaRouteProcess', Plugin, 100);

/*
 * Public API Surface of scully-plugin-esa
 */

/**
 * Generated bundle index. Do not edit.
 */
//# sourceMappingURL=scully-plugin-esa.js.map
