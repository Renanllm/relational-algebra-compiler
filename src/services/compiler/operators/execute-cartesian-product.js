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

export const executeCartesianProduct = (payload) => {
  const recordsConcatenated = concatenateRecords(
    payload.leftEntity,
    payload.rightEntity
  );

  return {
    name: `${payload.leftEntity.name}_${payload.rightEntity.name}`,
    columns: {
      ...payload.leftEntity.columns,
      ...payload.rightEntity.columns,
    },
    records: recordsConcatenated,
  };
};
