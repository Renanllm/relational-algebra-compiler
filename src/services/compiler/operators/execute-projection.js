import { isUniqueRecord } from "../utils/is-unique-records";

const getEntityColumns = (requiredColumns, entityColumns) => {
  const columns = {};

  Object.keys(entityColumns).forEach(column => {
    if (requiredColumns.includes(column)) {
      columns[column] = entityColumns[column];
    }
  })

  return columns;
}

export const executeProjection = ({ columns = [], entity }) => {
  const projectionedRecords = [];

  entity.records.forEach((record) => {
    let projectionedRecord = {};

    columns.forEach((column) => {
      if (!record[column]) {
        throw new Error(
          `Não existe nenhuma coluna chamada ${column} na entidade ${entity.name}`
        );
      }

      projectionedRecord[column] = record[column];
    });

    if (isUniqueRecord(projectionedRecord, projectionedRecords)) {
      projectionedRecords.push(projectionedRecord);
    }
  });

  console.table(projectionedRecords)

  return {
    name: entity.name,
    columns: getEntityColumns(columns, entity.columns),
    records: projectionedRecords
  };
};
