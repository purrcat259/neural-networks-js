import * as Neuron from './neuron';

export default class OutputNeuron extends Neuron {
    calculateError(previousError, weight, activation) {
        return previousError * weight * activation * (1 - activation);
    }
}
