export const rotate = (matrix) => {
  return matrix[0].map((_, i) =>
    matrix.map(row => row[i]).reverse()
  );
};
