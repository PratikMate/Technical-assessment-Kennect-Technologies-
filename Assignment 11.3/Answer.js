let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
// output = 6

let height2 = [4, 2, 0, 3, 2, 5];
// output = 9

/*
   Time complexity of this code for all cases will be O(n);
   Space complexity of this code is O(n);
*/

const trapWater = (height) => {
    let right = new Array(height.length);
    
    // storing greatest element for each height array element on right side
    let max = 0;
    for (let i = height.length - 1; i >= 0; i--) {
        right[i] = max;
        if (height[i] > max) {
            max = height[i];
        }
    }
    // finding greatest element for each height array element on left side
    // and selecting minimum between left & right to get answer
    max = 0
    let ans = 0;
    for (let i = 0; i < height.length; i++) {
        if (i >= 1) {
            let x = Math.min(max, right[i])
            if (height[i] < x) {
                //console.log(i,Math.min(left[i],right[i]),height[i])
                ans += x - height[i];
            }
        }
        if (height[i] > max) {
            max = height[i];
        }
    }
    return ans;
}

console.log(trapWater(height));
console.log(trapWater(height2));