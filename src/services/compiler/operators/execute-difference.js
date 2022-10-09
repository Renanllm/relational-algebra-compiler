import { addEntityRecord } from "../utils/binary-operation-functions";
import { isEntitiesCompatibles } from "../utils/is-compatible-type";
import { isRecordInLeftAndInRightEntity } from "../utils/is-record-in-left-and-right-entity";
import { isUniqueRecord } from "../utils/is-unique-records";

export const executeDifference = ({ leftEntity, rightEntity }) => {
  if (isEntitiesCompatibles(leftEntity, rightEntity)) {
    const differenceRecords = [];

    leftEntity.records.forEach((record, index) => {
      if (rightEntity.records[index]) {
        const leftEntityRecordValues = Object.values(record);
        const rightEntityRecordValues = Object.values(
          rightEntity.records[index]
        );

        if (
          !isRecordInLeftAndInRightEntity(
            leftEntityRecordValues,
            rightEntityRecordValues
          ) &&
          isUniqueRecord(record, differenceRecords)
        ) {
          addEntityRecord(record, differenceRecords);
        }
      }
    });

    console.table(differenceRecords);

    return {
      name: `${leftEntity.name}_${rightEntity.name}`,
      columns: leftEntity.columns,
      records: differenceRecords,
    };
  }
};
