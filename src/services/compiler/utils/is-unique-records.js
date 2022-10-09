export const isUniqueRecord = (record, records = []) => {
  return !records.some((r) => {
    const recordKeys = Object.keys(r);
    return recordKeys.every((key) => r[key] == record[key]);
  });
};
