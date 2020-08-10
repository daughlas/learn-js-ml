import * as tfvis from '@tensorflow/tfjs-vis'
import * as tf from '@tensorflow/tfjs'

window.onload = async () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 3, 5, 7];

  tfvis.render.scatterplot(
    { name: '线性回归训练集' },
    { values: xs.map((x, i) => ({x, y: ys[i]})) },
    {
      xAxisDomain: [0, 5],
      yAxisDomain: [0, 8]
    }
  );

  // 创造一个连续的模型
  // 连续的模型：这一层的输入等于上一层的输出
  // 绝大多数模型都是连续的
  const model = tf.sequential();

  // dense 全链接层
  // output = activation(dot(input, kernel) + bias)
  // kernael 是权重矩阵
  model.add(tf.layers.dense({
    units: 1,
    inputShape: [1]
  }))

  // 设置损失函数维均方误差
  // 设置优化器，随机梯度下降
  model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.1)
  })

  const inputs = tf.tensor(xs);
  const labels = tf.tensor(ys);
  
  await model.fit(inputs, labels, {
    batchSize: 4, // 每次模型学习的样本数量
    epochs: 200, // 模型迭代的次数，4个数字1个 epoch 就是 4 次
    callbacks: tfvis.show.fitCallbacks(
      {name: '训练过程'},
      ['loss']
    )
  });

  const output = model.predict(tf.tensor([5]));
  alert(`如果 x 为 5，那么预测 y 为 ${output.dataSync()[0]}`);
}