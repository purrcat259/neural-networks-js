import Neuron from './neuron';

export default class HiddenNeuron extends Neuron {
    calculateError(previousError, weight, activation) {
        return previousError * weight * activation * (1 - activation);
    }
}
