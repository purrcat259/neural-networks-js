export default class Neuron {
    constructor(number, layer, inputCount, learningRate) {
        this.number = number;
        this.layer = layer;
        this.inputCount = inputCount;
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

    calculateNet(inputs, weight) {
        let net = 0;
        for (let i = 0; i < inputCount; i++) {
            const input = inputs[i];
            const weight = weights[i];
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
}
