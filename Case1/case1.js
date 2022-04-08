function get(path, object) {
  let firstPath = path.split('.')[0]

  if(!path) {
    return object
  } else if(object[firstPath]) {
    return get(path.split('.').slice(1).join('.'), object[firstPath])
  }
  return null
}

get('a.b.c.d[1].e', { a: { b: { c: 1, d: [1, { e: 2}]}}})