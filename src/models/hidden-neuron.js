import Neuron from './neuron';

export default class HiddenNeuron extends Neuron {
    // These values are from the neuron ahead
    calculateError(previousError, weight, activation) {
        const error = previousError * weight * activation * (1 - activation);
        this.error = error;
        return error;
    }
}
