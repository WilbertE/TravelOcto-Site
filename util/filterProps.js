export function filterProps(props, filter) {
  return Object.keys(props)
    .filter(k => !filter.includes(k))
    .reduce((obj, key) => {
      obj[key] = props[key];
      return obj;
    }, {});
}
