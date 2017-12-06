import NeuralNetwork from './neural-network';

let dataset = [
    {
        inputs: [0.23, 0.45],
        target: 0.32
    },
    {
        inputs: [0.78, 0.32],
        target: 0.64
    },
    {
        inputs: [0.86, 0.12],
        target: 0.53
    },
    {
        inputs: [0.12, 0.76],
        target: 0.19
    },
];

const learningRate = 0.7;

let neuralNet = new NeuralNetwork(learningRate);

let epochLabels = [];

let errorChart = new Chartist.Line('.ct-chart', {
    labels: epochLabels,
    series: [
        []
    ]
});

let drawError = (epochNumber) => {
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
    console.log(`Epoch Errors: ${neuralNet.epochErrors}`);
    let epochNumber = neuralNet.epochErrors.length + 1;
    drawError(epochNumber);
});
