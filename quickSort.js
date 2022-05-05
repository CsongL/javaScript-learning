function quickSort(array, left, right) {
    let i = left, j = right;
    while(i < j) {
        while(array[j] >= array[left] && i < j ) {
            j--;
        }

        while(array[i] <= array[left] && i < j) {
            i++;
        }

        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    let temp = array[left];
    array[left] = array[i];
    array[i] = temp;
    quickSort(array, left, i - 1);
    quickSort(array, i + 1, right);
};

let arr = [2,3,4,1,6,7,2];
quickSort(arr, 0, arr.length - 1);
console.log(arr);