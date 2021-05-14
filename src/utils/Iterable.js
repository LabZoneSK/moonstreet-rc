/**
 * Function search in map(haystack) for value (needle) in specified key.
 *
 * @param {Immutable.Map} haystack
 * @param {*} needle
 * @param {String} key
 */
export function findInMap(haystack, needle, key) {
  let lostNFound;
  Object.keys(haystack).forEach((needleKey) => {
    if (needle === haystack[needleKey][key]) {
      lostNFound = haystack[needleKey];
    }
  });
  return lostNFound;
}

/**
 * Function merges inner maps with provided merge function.
 * Example of merge function:
 * (acc, current) => acc + current
 *
 * @param {Immutable.Map} maps
 * @param {String} innerMapKey
 * @param {function} mergeFunc
 */
export function mergeMaps(maps, innerMapKey, mergeFunc) {
  let mergedMap = Map();
  maps.forEach((map) => {
    // make sure wallet has assets
    if (map.get('assets') !== undefined) {
      map.get(innerMapKey).forEach((value, key) => {
        if (mergedMap.get() && mergedMap.get(key)) {
          mergedMap = mergedMap.update((innerKey, v) => mergeFunc(v, value));
        } else {
          mergedMap = mergedMap.set(key, value);
        }
        return true;
      });
    }
  });
  return mergedMap;
}
