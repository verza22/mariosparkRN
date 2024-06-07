export function transformArrayToObject(array, keyName = "name", valueName = "id") {
    const result = {};
    array.forEach(item => {
      result[item[keyName]] = Number(item[valueName]);
    });
    return result;
  }