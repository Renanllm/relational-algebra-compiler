import { addEntityRecord } from "../utils/binary-operation-functions";
import { isEntitiesCompatibles } from "../utils/is-compatible-type";
import { isUniqueRecord } from "../utils/is-unique-records";

export const executeUnion = ({ leftEntity, rightEntity }) => {
  if (isEntitiesCompatibles(leftEntity, rightEntity)) {
    const unionRecords = leftEntity.records;

    rightEntity.records.forEach((record) => {
      if (isUniqueRecord(record, unionRecords)) {
        addEntityRecord(record, unionRecords);
      }
    });

    console.table(unionRecords);

    return {
      name: `${leftEntity.name}_${rightEntity.name}`,
      columns: leftEntity.columns,
      records: unionRecords,
    };
  }
};
