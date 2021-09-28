const toString = Object.prototype.toString;

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef(val) {
  return typeof val !== 'undefined';
}



export function isNumber(val) {
  return is(val, 'Number') && !isNaN(val);
}

export function isElement(val) {
  return val ? !!(val).tagName : false;
}


