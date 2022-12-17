export default class createDOMElem {
  static createDiv(className: string, textContent?: string): HTMLDivElement {
    const div = document.createElement('div')
    div.className = className
    textContent && (div.textContent = textContent)
    return div
  }

  static createIFrame(className: string, src: string): HTMLIFrameElement {
    const iFrame = document.createElement('iframe')
    iFrame.className = className
    iFrame.src = src
    return iFrame
  }

  static createImg(className: string, src: string): HTMLImageElement {
    const img = document.createElement('img')
    img.className = className
    img.src = src
    return img
  }
}
