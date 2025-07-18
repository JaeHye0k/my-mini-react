class React {
    /**
     * @param {string} type
     * @param {Object | null} props
     * @param {ReactElement[]} children
     * @returns {ReactElement}
     * @description 이 함수가 반환하는 ReactElement 객체는 생성하고자하는 UI 구조를 설명합니다.
     * @link [API DOCS](https://ko.react.dev/reference/react/createElement)
     */
    static createElement(type, props, ...children) {
        return {
            type,
            props: props || {},
            children,
        };
    }

    static render(element, container) {
        const dom = document.createElement(element.type);
        Object.entries(element.props).forEach(([key, value]) => {
            dom.setAttribute(key, value);
        });
        element.children.forEach((child) => {
            if (typeof child === "string") {
                dom.appendChild(document.createTextNode(child));
            } else {
                this.render(child, dom);
            }
        });
        container.appendChild(dom);
    }
}

export default React;
