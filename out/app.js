import createDOMElem from './util/createDOMElem.js';
const parent = document.querySelector('.wrapper');
const input = document.querySelector('input');
input.addEventListener('keyup', reload);
let currentDate = undefined;
let reset = true;
const DEFAULT_DATE = '2020-10-01';
const fillElement = (date) => {
    const createElement = (status, content) => {
        const item = createDOMElem.createDiv('item');
        const checkContentType = (mediaType) => {
            if (mediaType === 'video') {
                return createDOMElem.createIFrame('video', content.url);
            }
            else {
                return createDOMElem.createImg('img', content.url);
            }
        };
        if (status === 'error') {
            const error = createDOMElem.createDiv('error', content.msg ? content.msg : content.error.code);
            item.appendChild(error);
            return item;
        }
        const coverImg = document.createElement('img');
        content.media_type === 'video'
            ? (coverImg.src = `https://img.youtube.com/vi/${content.url.split('/')[4]}/hqdefault.jpg`)
            : (coverImg.src = content.url);
        coverImg.className = 'cover';
        item.appendChild(coverImg);
        const title = document.createElement('h2');
        title.textContent = content.title;
        item.appendChild(title);
        item.appendChild(checkContentType(content.media_type));
        const explanation = document.createElement('p');
        explanation.textContent = content.explanation;
        item.appendChild(explanation);
        const credit = document.createElement('span');
        if (content.copyright && content.copyright.length >= 40) {
            content.copyright = content.copyright.slice(0, 40).trim() + '...';
        }
        credit.textContent = 'Credit: ' + (content.copyright ? content.copyright : 'NASA');
        item.appendChild(credit);
        return item;
    };
    fetch(`https://api.nasa.gov/planetary/apod?api_key=o9uUhLdyZCUA3cr84V6iVATn50sPXjGJdjnoSptk&date=${date}`)
        .then(res => res.json())
        .then((res) => {
        if (res.error) {
            parent.appendChild(createElement('error', res));
            return;
        }
        if (res.code !== 200 && res.code) {
            parent.appendChild(createElement('error', res));
        }
        else {
            parent.appendChild(createElement('OK', res));
        }
    });
};
const addElement = () => {
    const convertToString = (date) => date.toISOString().replace(/T.*/, '');
    const startDate = input.value;
    if (!currentDate || reset) {
        currentDate = new Date(startDate);
        if (isNaN(currentDate.getTime())) {
            console.log('Date not recognized!');
            currentDate = new Date(DEFAULT_DATE);
        }
        fillElement(convertToString(currentDate));
        reset = false;
    }
    else {
        currentDate.setDate(currentDate.getDate() + 1);
        fillElement(convertToString(currentDate));
    }
};
let debounce = false;
const update = () => {
    const children = parent.children;
    const lastChild = children[children.length - 1];
    if (!lastChild) {
        addElement();
        return;
    }
    const rect = lastChild.getBoundingClientRect();
    if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) && !debounce) {
        debounce = true;
        addElement();
    }
    setTimeout(() => (debounce = false), 10);
};
setInterval(update, 50);
let timeout = undefined;
function reload() {
    if (timeout)
        clearTimeout(timeout);
    timeout = setTimeout(() => {
        const children = parent.children;
        if (!children)
            return;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.remove();
        }
        reset = true;
        timeout = undefined;
    }, 1000);
}
//# sourceMappingURL=app.js.map