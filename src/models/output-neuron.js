import * as Neuron from './neuron';

export default class OutputNeuron extends Neuron {
    calculateError(target, activation) {
        return (target - activation) * activation * (1 - activation);
    }
}
