import NeuralNetwork from './neural-network';

let neuralNet = new NeuralNetwork(0.8);

document.getElementById('iterationButton').addEventListener('click', () => {
    neuralNet.runIteration();
});
