export default class Neuron {
    consturctor(number, layer, inputs, weights, learningRate) {
        this.number = number;
        this.layer = layer;
        this.inputs = inputs;
        this.weights = weights;
        this.learningRate = learningRate;
    }

    calculateNet(inputs, weight) {
        let net = 0;
        for (let i = 0; i < inputs.length; i++) {
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
        for (let i = 0; i < this.weights.length; i++) {
            let oldWeight = this.weights[i];
            let inputValue = this.inputs[i];
            this.weights[i] = this.calculateNewWeight(this.weights[i], error, inputValue);
        }
    }
}
