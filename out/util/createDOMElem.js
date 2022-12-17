export default class createDOMElem {
    static createDiv(className, textContent) {
        const div = document.createElement('div');
        div.className = className;
        textContent && (div.textContent = textContent);
        return div;
    }
    static createIFrame(className, src) {
        const iFrame = document.createElement('iframe');
        iFrame.className = className;
        iFrame.src = src;
        return iFrame;
    }
    static createImg(className, src) {
        const img = document.createElement('img');
        img.className = className;
        img.src = src;
        return img;
    }
}
//# sourceMappingURL=createDOMElem.js.map