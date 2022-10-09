const isKeyTypeByConstraint = (entity, column, type, rightEntityName = "") => {
  const entityColumn = Object.keys(entity.columns).find(
    (col) => col === column
  );

  if (
    type === "foreignKey" &&
    entity.columns[entityColumn]?.relationshipEntity !== rightEntityName
  ) {
    return false;
  }

  return entity.columns[entityColumn][type];
};

const validateIfThereIsRelationshipBetweenEntities = ({
  leftEntity,
  leftEntityColumn,
  rightEntity,
  rightEntityColumn,
}) => {
  if (
    !isKeyTypeByConstraint(
      leftEntity,
      leftEntityColumn,
      "foreignKey",
      rightEntity.name
    ) ||
    !isKeyTypeByConstraint(rightEntity, rightEntityColumn, "primaryKey")
  ) {
    throw new Error(
      "Ocorreu um problema na identificação de relacionamento entre entidades"
    );
  }

  return true;
};

const concatenateRecords = (leftEntity, rightEntity) => {
  const records = [];

  leftEntity.records.forEach((leftRecord) => {
    rightEntity.records.forEach((rightRecord) => {
      const record = { ...leftRecord, ...rightRecord };
      records.push(record);
    });
  });

  return records;
};

export const executeJunction = (payload) => {
  if (validateIfThereIsRelationshipBetweenEntities(payload)) {
    const recordsConcatenated = concatenateRecords(
      payload.leftEntity,
      payload.rightEntity
    );

    const recordsWithRelation = recordsConcatenated.filter(
      (record) =>
        record[payload.leftEntityColumn] == record[payload.rightEntityColumn]
    );

    return {
      name: `${payload.leftEntity.name}_${payload.rightEntity.name}`,
      columns: {
        ...payload.leftEntity.columns,
        ...payload.rightEntity.columns,
      },
      records: recordsWithRelation,
    };
  }
};
