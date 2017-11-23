import * as HiddenNeuron from './models/hidden-neuron';
import * as OutputNeuron from './models/output-neuron';

export default class Network {
    consturctor(learningRate) {
        this.learningRate = learningRate || 0.8;
        this.neurons = generateNetwork();
        this.currentDataRow = 0;
        this.iteration = 0;
        initialiseNetwork();
    }

    generateNetwork() {
        let neurons = [
            new HiddenNeuron(0, 0, 2, this.learningRate),
            new HiddenNeuron(1, 0, 2, this.learningRate),
            new OutputNeuron(0, 1, 2, this.learningRate)
        ];
        return neurons;
    }

    feedForward(inputs) {

    }

    backPropogate() {

    }

    initialiseNetwork() {
        // TODO: Read inputs from file
        this.dataset = [
            {
                inputs: [0.303, 0.098],
                target: 0.509
            },
            {
                inputs: [0.412, -0.001],
                target: 0.392
            },
            {
                inputs: [0.367, 0.480],
                target: 0.603
            },
            {
                inputs: [-0.168, -0.124],
                target: 0.594
            },
        ];
    }

    runIteration() {
        this.iteration += 1;
        this.currentDataRow += 1;
        if (this.currentDataRow > this.dataset.length) {
            this.currentDataRow = 0;
        }
        feedForward(this.dataset[this.currentDataRow].inputs);
    }
}
