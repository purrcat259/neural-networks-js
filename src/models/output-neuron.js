import Neuron from './neuron';

export default class OutputNeuron extends Neuron {
    calculateError(target, activation) {
        let error = (target - activation) * activation * (1 - activation);
        this.error = error;
        return error;
    }
}
