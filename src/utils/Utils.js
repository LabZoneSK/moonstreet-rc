/**
 * Function to remove a key+value from and object
 *
 * @param {Object} obj
 * @param {String} deleteKey
 */

export function removeKey(obj, deleteKey) {
  const clone = { ...obj };
  delete clone[deleteKey];
  return clone;
}

/**
 * Function to remove a key+value from and object
 *
 * @param {Object} obj
 * @param {String} deleteKey
 */

export function mergeObjectChildren(obj, innerKey) {
  const mergedObject = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key][innerKey] !== undefined) {
      Object.keys(obj[key][innerKey]).forEach((assetKey) => {
        if (mergedObject[assetKey]) {
          mergedObject[assetKey] += obj[key][innerKey][assetKey];
        } else {
          mergedObject[assetKey] = obj[key][innerKey][assetKey];
        }
      });
    }
  });

  return mergedObject;
}
