import * as tfvis from '@tensorflow/tfjs-vis'
import * as tf from '@tensorflow/tfjs'

window.onload = async () => {
  const heights = [150, 155, 160, 165, 170];
  const weights = [40, 45, 50, 55, 60];

  tfvis.render.scatterplot(
    { name: '身高体重训练数据'},
    { values: heights.map((x, i) => ({x, y: weights[i]}))},
    {
      xAxisDomain: [120, 200],
      yAxisDomain: [30, 70]
    }
  )

  // 归一化
  const inputs = tf.tensor(heights).sub(150).div(20)
  const labels = tf.tensor(weights).sub(40).div(20)

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 1,
    inputShape: [1]
  }))
  model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.1)
  })
  await model.fit(inputs, labels, {
    batchSize: 5,
    epochs: 100,
    callbacks: tfvis.show.fitCallbacks(
      {name: '训练过程'},
      ['loss']
    )
  });

  const output = model.predict(tf.tensor([180]).sub(150).div(20));
  alert(`如果身高为 180 cm，那么预测体重为 ${output.mul(20).add(40).dataSync()[0]} 千克`);
}