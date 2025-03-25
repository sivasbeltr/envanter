/**
 * DOM utility functions
 */


export class DOMUtils {
    /**
     * Check if an element exists in the DOM
     */
    public static elementExists(selector: string): boolean {
        return document.querySelector(selector) !== null;
    }

    /**
     * Toggle a class on an element
     */
    public static toggleClass(element: HTMLElement, className: string): boolean {
        const hasClass = element.classList.contains(className);
        if (hasClass) {
            element.classList.remove(className);
            return false;
        } else {
            element.classList.add(className);
            return true;
        }
    }

    /**
     * Add event listener with automatic cleanup
     * Returns a function that will remove the event listener when called
     */
    public static addSafeEventListener<K extends keyof HTMLElementEventMap>(
        element: HTMLElement,
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
    ): () => void {
        element.addEventListener(type, listener);
        return () => element.removeEventListener(type, listener);
    }

    /**
     * Create an element with attributes and child elements
     */
    public static createElement<K extends keyof HTMLElementTagNameMap>(
        tagName: K,
        attributes?: Record<string, string>,
        children?: (HTMLElement | Text)[]
    ): HTMLElementTagNameMap[K] {
        const element = document.createElement(tagName);

        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (children) {
            children.forEach(child => element.appendChild(child));
        }

        return element;
    }
}
