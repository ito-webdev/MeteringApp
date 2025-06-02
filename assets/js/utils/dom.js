export function createElement(tag, classNames, attributes = {}) {
  const element = document.createElement(tag);
  if (classNames) element.className = classNames;
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}
