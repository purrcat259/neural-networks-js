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

let epochCount = 1;
const runEpoch = (data) => {
    console.log(`Running Epoch: ${epochCount}`);
    for (let i = 0; i < data.length; i++) {
        neuralNet.runFeedforward(data[i]);
        neuralNet.runBackPropogation(data[i]);
    }
    epochCount += 1;
};

document.getElementById('runEpochButton').addEventListener('click', () => {
    runEpoch(dataset);
});
