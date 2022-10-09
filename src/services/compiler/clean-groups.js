const cleanVariableGroup = (variable) => {
  const cleannedVariable = variable.split("<-")[0].trim();

  if (!cleannedVariable) {
    throw new Error("Sintaxe de atribuição de variável errada");
  }

  return cleannedVariable;
};

const cleanColumns = (columns) =>
  columns.split(",").map((column) => column.trim().toLowerCase());

export function cleanGroups(groups) {
  const cleannedGroups = { ...groups };

  if (cleannedGroups.operator == "σ") {
    cleannedGroups.column = cleannedGroups.column.trim().toLowerCase();
  }

  if (cleannedGroups.operator == "π") {
    cleannedGroups.columns = cleanColumns(cleannedGroups.columns);
  }

  if (cleannedGroups.operator == "⨝") {
    cleannedGroups.leftEntityColumn = cleannedGroups.leftEntityColumn.trim().toLowerCase();
    cleannedGroups.rightEntityColumn = cleannedGroups.rightEntityColumn.trim().toLowerCase();
  }

  if (cleannedGroups.variable) {
    cleannedGroups.variable = cleanVariableGroup(cleannedGroups.variable);
  }

  return cleannedGroups;
}
