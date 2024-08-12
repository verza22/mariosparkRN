export function transformArrayToObject(array, keyName = "name", valueName = "id") {
    const result = {};
    array.forEach(item => {
      result[item[keyName]] = Number(item[valueName]);
    });
    return result;
}

export function adjustText(text, numCharacters, left) {
  if (text.length > numCharacters) {
      return text.slice(0, numCharacters);
  } else if (text.length < numCharacters) {
      const neededSpaces = numCharacters - text.length;
      const spaces = ' '.repeat(neededSpaces);
      return left ? spaces + text : text + spaces;
  } else {
      return text;
  }
}