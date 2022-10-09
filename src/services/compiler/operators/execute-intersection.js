import { addEntityRecord } from "../utils/binary-operation-functions";
import { isEntitiesCompatibles } from "../utils/is-compatible-type";
import { isRecordInLeftAndInRightEntity } from "../utils/is-record-in-left-and-right-entity";
import { isUniqueRecord } from "../utils/is-unique-records";

export const executeIntersection = ({ leftEntity, rightEntity }) => {
  if (isEntitiesCompatibles(leftEntity, rightEntity)) {
    const intersectionRecords = [];

    leftEntity.records.forEach((record, index) => {
      const leftEntityRecordValues = Object.values(record);
      if (rightEntity.records[index]) {
        const rightEntityRecordValues = Object.values(rightEntity.records[index]);
  
        if (
          isRecordInLeftAndInRightEntity(
            leftEntityRecordValues,
            rightEntityRecordValues
          ) &&
          isUniqueRecord(record, intersectionRecords)
        ) {
          addEntityRecord(record, intersectionRecords);
        }
      }
    });

    console.table(intersectionRecords);

    return {
      name: `${leftEntity.name}_${rightEntity.name}`,
      columns: leftEntity.columns,
      records: intersectionRecords,
    };
  }
};
