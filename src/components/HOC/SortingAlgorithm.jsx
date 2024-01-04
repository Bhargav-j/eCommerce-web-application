export const SortProductsAlgo = (products) => {
  let UnsortedProducts = [...products];

  function mergeSort(UnsortedProducts) {
    if (UnsortedProducts.length > 1) {
      let midValue = Math.ceil(UnsortedProducts.length / 2);
      let leftArray = UnsortedProducts.slice(0, midValue);
      let rightArray = UnsortedProducts.slice(midValue);

      const sortedLeft = mergeSort(leftArray);
      const sortedRight = mergeSort(rightArray);

      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
        if (sortedLeft[leftIndex]['price'] < sortedRight[rightIndex]['price']) {
          result.push(sortedLeft[leftIndex]);
          leftIndex++;
        } else {
          result.push(sortedRight[rightIndex]);
          rightIndex++;
        }
      }

      while (leftIndex < sortedLeft.length) {
        result.push(sortedLeft[leftIndex]);
        leftIndex++;
      }

      while (rightIndex < sortedRight.length) {
        result.push(sortedRight[rightIndex]);
        rightIndex++;
      }

      return result;
    } else {
      return UnsortedProducts;
    }
  }

  const SortedProducts = mergeSort(UnsortedProducts);
  return SortedProducts;
};
