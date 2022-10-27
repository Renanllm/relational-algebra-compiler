const selection =
  /(?<variable>[\w]+\s?<-\s?)?(?<operator>[σ])\s?(?<column>\w+)\s?(?<conditional>[<>=]?>?=?<?=?)\s?['"]?(?<value>.+?)['"]?\s?\((?<entity>.+)\)/;

const projection =
  /(?<variable>[\w]+\s?<-\s?)?(?<operator>π)\s?(?<columns>[A-Za-z, ]+[^(])\((?<entity>\w+)\)/;

const binaries =
  /(?<variable>[\w]+\s?<-\s?)?(?<leftEntity>\w+)\s(?<operator>[∪∩X-])\s(?<rightEntity>\w+)/;

const join =
  /(?<variable>[\w]+\s?<-\s?)?(?<leftEntity>[A-Z]+)\s?(?<operator>⨝)\s?(?<leftEntityColumn>\w+)\s?=\s?(?<rightEntityColumn>\w+)\s(?<rightEntity>[A-Z]+)/;

const regexForExpressionsByOperators = [selection, projection, binaries, join];

export function identifyAndValidateRelationalAlgebraExpression(expression) {
  if (expression) {
    let groups;

    regexForExpressionsByOperators.forEach((regex) => {
      const matchResult = expression.match(regex);
      if (matchResult) {
        groups = matchResult.groups;
      }
    });

    if (!groups || (groups.value && groups.value.trim() == '')) {
      throw new Error("Expressão inválida");
    }

    if (groups?.variable == undefined) {
      delete groups?.variable;
    }

    return groups;
  }
}
