import * as tf from '@tensorflow/tfjs'

const input = [1, 2, 4, 5]
const t1 = [[1, 2, 3, 4], [2, 3, 4, 6], [3, 4, 5, 6], [7,8,9,10]]
const output= [0, 0, 0, 0]

// 传统 for 循环
for (let i = 0; i < t1.length; i++) {
  for (let j = 0; j < input.length; j++) {
    output[i] += input[j] * t1[i][j];
  }
}
console.log(output)

// 使用 tensor

tf.tensor(t1).dot(tf.tensor(input)).print()