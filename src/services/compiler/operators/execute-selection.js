const validateIfColumnExistsInEntity = (column, entity) => {
  return Boolean(Object.keys(entity.columns).find((key) => key === column));
};

const validateConditional = (entityColumn, conditional, value) =>
  eval(
    `'${entityColumn}' ${conditional == "=" ? "==" : conditional} '${value}'`
  );

export const executeSelection = ({ column, conditional, value, entity }) => {
  if (!validateIfColumnExistsInEntity(column, entity)) {
    throw new Error(
      `Não existe nenhuma coluna chamada ${column} na entidade ${entity.name}`
    );
  }

  const selectionedRecords = entity.records.filter((record) =>
    validateConditional(
      record[column],
      conditional,
      value
    )
  );

  console.table(selectionedRecords);

  return {
    name: entity.name,
    columns: entity.columns,
    records: selectionedRecords,
  };
};
