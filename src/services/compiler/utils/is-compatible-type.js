const isSameColumnsLength = (entityAColumns, entityBColumns) =>
  Object.keys(entityAColumns).length == Object.keys(entityBColumns).length;

const isSameColumnsType = (entityAColumns, entityBColumns) => {
  const allColumnTypesFromEntityA = Object.values(entityAColumns)
    .map((column) => column.type)
  const allColumnTypesFromEntityB = Object.values(entityBColumns)
    .map((column) => column.type)

  return allColumnTypesFromEntityA.every(
    (column, index) => allColumnTypesFromEntityB[index] == column
  );
};

export const isEntitiesCompatibles = (entityA, entityB) => {
  if (!entityA?.columns || !entityB?.columns) {
    throw new Error("Entidade inválida");
  }

  if (!isSameColumnsLength(entityA.columns, entityB.columns)) {
    throw new Error("O número de colunas das entidades são diferentes uma das outras");
  }

  if (!isSameColumnsType(entityA.columns, entityB.columns)) {
    throw new Error("As colunas das entidades são de tipos incompatíveis");
  }

  return true;
};
