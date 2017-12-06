export default class Neuron {
    constructor(number, layer, inputCount, learningRate) {
        this.number = number;
        this.layer = layer;
        this.inputCount = inputCount + 1; // Adding bias
        this.learningRate = learningRate;
        this.activation = null;
        this.error = null;
    }

    generateWeights(weights) {
        if (weights && weights.length) {
            this.weights = weights;
            return;
        }
        weights = [];
        for (let i = 0; i < this.inputCount; i++) {
            weights[i] = Math.random();
        }
        this.weights = weights;
    }

    calculateNet(inputs) {
        let net = 0;
        let neuronInputs = inputs.slice();
        // Add in the bias value ot the inputs
        neuronInputs.unshift(1);
        // Store the inputs to be able to change the weights
        this.inputs = neuronInputs;
        for (let i = 0; i < this.inputCount; i++) {
            const input = neuronInputs[i];
            const weight = this.weights[i];
            net += (input * weight);
        }
        return net;
    }

    calculateActivation(net) {
        const activation = 1 / (1 + Math.exp(-net));
        this.activation = activation;
        return activation;
    }

    // Override depending on target / hidden
    calculateError() {}


    updateWeights() {
        let oldWeights = this.weights.slice();
        for (let i = 0; i < this.inputCount; i++) {
            let oldWeight = this.weights[i];
            let inputValue = this.inputs[i];
            this.weights[i] = this.calculateNewWeight(this.weights[i], this.error, inputValue);
        }
        this.log(`Weights updated from: ${oldWeights} to [${this.weights.join(', ')}]`);
    }

    calculateNewWeight(oldWeight, error, inputValue) {
        this.log(`Calculating new weight given old weight: ${oldWeight}, error: ${error} and input: ${inputValue}`);
        return oldWeight + (this.learningRate * error * inputValue);
    }

    log(message) {
        console.log(`[Layer: ${this.layer}, Neuron: ${this.number}]: ${message}`);
    }
}
