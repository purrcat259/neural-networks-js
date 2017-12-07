import NeuralNetwork from './neural-network';
// import { getDataset } from './datasets/test';
import { getDataset } from './datasets/sin';

let dataset = getDataset();

const learningRate = 0.7;

let neuralNet = new NeuralNetwork(learningRate);

let epochLabels = [];

let options = {
  width: 600,
  height: 600
};

let errorChart = new Chartist.Line(
    '.ct-chart',
    {
        labels: epochLabels,
        series: [
            []
        ]
    },
    options
);

let drawEpochCount = (epochNumber) => {
    document.getElementById('epochCount').innerText = `${epochNumber}`;
};

let drawError = (epochNumber) => {
    drawEpochCount(epochNumber);
    epochLabels.push(String(epochNumber));
    let data = {
        labels: epochLabels,
        series: [
            neuralNet.epochErrors.slice()
        ]
    }
    errorChart.update(data);
};

document.getElementById('runEpochButton').addEventListener('click', () => {
    neuralNet.runEpoch(dataset);
    let epochNumber = neuralNet.epochErrors.length + 1;
    drawError(epochNumber);
});

document.getElementById('runSeveralEpochsButton').addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        neuralNet.runEpoch(dataset);
        let epochNumber = neuralNet.epochErrors.length + 1;
    }
    drawError(epochNumber);
});
