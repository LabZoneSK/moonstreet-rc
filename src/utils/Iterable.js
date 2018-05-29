import { Map } from 'immutable';

/**
 * Function search in map(haystack) for value (needle) in specified key.
 * 
 * @param {Immutable.Map} haystack 
 * @param {*} needle 
 * @param {String} key 
 */
export function findInMap(haystack, needle, key) {
  return haystack.find((value) => { 
    return value.get(key) === needle; 
  }); 
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
    //make sure wallet has assets
    if (map.get('assets') !== undefined) {
      map.get(innerMapKey).map((value, key) => { 
        if (mergedMap.get(key)) {
          mergedMap = mergedMap.update(key, v => mergeFunc(v, value));
        } else {
          mergedMap = mergedMap.set(key, value);
        }
        return true;
      });
    }
  });
  return mergedMap;
}
