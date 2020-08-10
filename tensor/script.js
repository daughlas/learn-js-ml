import * as tf from '@tensorflow/tfjs'

// 0 为数组
const t0 = tf.tensor(1)
print(t0)

// 1 维数组
const t1 = tf.tensor([1, 2, 3])
print(t1)

// 2 维数组
const t2 = tf.tensor([[1, 2], [3, 4, 5]])
print(t2)

// 3 维数组
const t3 = tf.tensor([[[1, 4, 5, 6]]])
print(t3)


function print(obj) {
    obj.print()
    console.log(obj)
}