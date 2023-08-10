module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openingBrackets = [];
  const closingBrackets = [];
  const matchingBrackets = {};

  for (const [opening, closing] of bracketsConfig) {
    if (opening === closing) {
      // Если открывающая и закрывающая скобки одинаковы, значит они могут быть идентификаторами отдельных пар скобок
      // Для учета этого случая, мы поместим их в отдельные массивы
      openingBrackets.unshift(opening);
      closingBrackets.unshift(closing);
    } else {
      openingBrackets.push(opening);
      closingBrackets.push(closing);
    }
    matchingBrackets[closing] = opening;
  }

  const isMatchingBracket = (bracket) => {
    if (
      openingBrackets.includes(bracket) &&
      closingBrackets.includes(bracket)
    ) {
      // Если скобка одновременно является открывающей и закрывающей,
      // проверяем, есть ли она в стеке среди последних добавленных скобок соответствующего типа
      return stack.includes(bracket, stack.length - 1);
    }
    return false; // Скобка имеет уникальный тип, не являясь одновременно открывающей и закрывающей
  };

  for (let bracket of str) {
    if (openingBrackets.includes(bracket) && !isMatchingBracket(bracket)) {
      // Если скобка является открывающей и не имеет совпадающей закрывающей скобки в стеке, добавляем ее в стек
      stack.push(bracket);
    } else if (closingBrackets.includes(bracket)) {
      // Если скобка является закрывающей, проверяем ее соответствие с последней открывающей скобкой в стеке
      if (stack.length === 0) {
        return false; // Если стек пуст, то последовательность неправильная
      }
      const lastOpeningBracket = stack.pop();
      if (matchingBrackets[bracket] !== lastOpeningBracket) {
        return false; // Если скобки не соответствуют друг другу, то последовательность неправильная
      }
    }
  }

  return stack.length === 0; // После прохода по всей последовательности стек должен быть пустым, чтобы последовательность была правильной
};
