export const addEntityRecord = (record, records = []) => {
  const baseRecordTemplate = records[0] ? { ...records[0] } : { ...record };
  const recordToAdd = {};
  const recordValues = Object.values(record);

  Object.keys(baseRecordTemplate).forEach((key, index) => {
    recordToAdd[key] = recordValues[index];
  });

  records.push(recordToAdd);
};
