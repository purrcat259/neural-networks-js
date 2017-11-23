export default class Neuron {
    constructor(number, layer, inputCount, learningRate) {
        this.number = number;
        this.layer = layer;
        this.inputCount = inputCount + 1; // Adding bias
        this.learningRate = learningRate;
        this.weights = this.generateWeights();
    }

    generateWeights() {
        let weights = [];
        for (let i = 0; i < this.inputCount; i++) {
            weights[i] = Math.random();
        }
        return weights;
    }

    calculateNet(inputs) {
        let net = 0;
        let neuronInputs = inputs.slice();
        // Add in the bias value ot the inputs
        neuronInputs.unshift(1);
        for (let i = 0; i < this.inputCount; i++) {
            const input = neuronInputs[i];
            const weight = this.weights[i];
            net += (input * weight);
        }
        return net;
    }

    calculateActivation(net) {
        return 1 / (1 + Math.exp(-net));
    }

    // Override depending on target / hidden
    calculateError() {}

    calculateNewWeight(oldWeight, error, inputValue) {
        return oldWeight + (this.learningRate * error * inputValue);
    }

    updateWeights(error, target) {
        for (let i = 0; i < this.inputCount; i++) {
            let oldWeight = this.weights[i];
            let inputValue = this.inputs[i];
            this.weights[i] = this.calculateNewWeight(this.weights[i], error, inputValue);
        }
    }

    log(message) {
        console.log(`[Layer: ${this.layer}, Number: ${this.number}]: ${message}`);
    }
}
