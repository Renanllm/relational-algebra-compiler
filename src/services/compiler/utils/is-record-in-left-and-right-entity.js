export const isRecordInLeftAndInRightEntity = (leftRecordValues, rightRecordValues) => {
  return leftRecordValues.every(
    (leftValue, index) => leftValue == rightRecordValues[index]
  );
};
