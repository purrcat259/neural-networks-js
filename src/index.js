import NeuralNetwork from './neural-network';
// import { getDataset } from './datasets/test';
import { getDataset, getTestDataset } from './datasets/sin';

let dataset = getDataset();

const learningRate = 0.7;
const tolerance = 0.1;

let neuralNet = new NeuralNetwork(learningRate);

let epochLabels = [];
let accuracies = [];

let options = {
    height: 600
};

let errorChart = new Chartist.Line(
    '#errorChart',
    {
        labels: epochLabels,
        series: [
            []
        ]
    },
    options
);

let accuracyChart = new Chartist.Bar(
    '#accuracyChart',
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

let drawAccuracy = (accuracy, tolerance) => {
    document.getElementById('accuracyPercentage').innerText = `${accuracy}% accurate with tolerance of: ${tolerance}`;
    let data = {
        labels: epochLabels,
        series: [
            accuracies
        ]
    }
    accuracyChart.update(data);
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
    // accuracies = [];
    // drawAccuracy('?', tolerance);
});

document.getElementById('runSeveralEpochsButton').addEventListener('click', () => {
    for (let i = 0; i < 50; i++) {
        neuralNet.runEpoch(dataset);
        let epochNumber = neuralNet.epochErrors.length + 1;
    }
    drawError(epochNumber);
    // accuracies = [];
    // drawAccuracy('?', tolerance);
});

document.getElementById('testAccuracyButton').addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        let testDataset = getTestDataset();
        let amount = testDataset.length;
        let amountWithinTolerance = neuralNet.testAccuracy(testDataset, tolerance);
        let accuracy = Math.round((amountWithinTolerance / amount) * 100);
        accuracies.push(accuracy);
        console.log(`${amountWithinTolerance} within tolerance of ${tolerance}. Accuracy: ${accuracy}%`);
    }
    drawAccuracy(accuracy, tolerance);
});
