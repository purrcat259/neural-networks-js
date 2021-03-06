import HiddenNeuron from './models/hidden-neuron';
import OutputNeuron from './models/output-neuron';

export default class NeuralNetwork {
    constructor(learningRate) {
        this.learningRate = learningRate || 0.8;
        console.log(`Network initialising with learning rate: ${learningRate}`);
        this.neurons = this.generateNetwork();
        this.iteration = 0;
        this.lastOutput = 0;
        this.epochErrors = [];
    }

    generateNetwork() {
        let neurons = [
            [new HiddenNeuron(0, 0, 2, this.learningRate), new HiddenNeuron(1, 0, 2, this.learningRate)],
            [new HiddenNeuron(0, 1, 2, this.learningRate), new HiddenNeuron(1, 1, 2, this.learningRate)],
            new OutputNeuron(0, 2, 2, this.learningRate)
        ];
        // let neurons = [
        //     [new HiddenNeuron(0, 0, 2, this.learningRate), new HiddenNeuron(1, 0, 2, this.learningRate), new HiddenNeuron(2, 0, 2, this.learningRate), new HiddenNeuron(3, 0, 2, this.learningRate)],
        //     [new HiddenNeuron(0, 1, 4, this.learningRate), new HiddenNeuron(1, 1, 4, this.learningRate), new HiddenNeuron(2, 1, 4, this.learningRate), new HiddenNeuron(3, 1, 4, this.learningRate)],
        //     [new HiddenNeuron(0, 2, 4, this.learningRate), new HiddenNeuron(1, 2, 4, this.learningRate), new HiddenNeuron(2, 2, 4, this.learningRate), new HiddenNeuron(3, 2, 4, this.learningRate)],
        //     new OutputNeuron(0, 3, 4, this.learningRate)
        // ];
        // TEST WEIGHT GENERATION
        // neurons[0][0].generateWeights([0.34, 0.56, -0.23]);
        // neurons[0][1].generateWeights([0.58, -0.27, 0.59]);
        // neurons[1][0].generateWeights([0.8, -0.9, -0.1]);
        // neurons[1][1].generateWeights([0.3, 0.5, 0.6]);
        // neurons[2].generateWeights([0.2, 0.3, -0.2]);
        // Generate random weights for all neurons
        neurons.forEach((layer) => {
            if (layer.length) {
                layer.forEach((neuron) => {
                    neuron.generateWeights();
                });
            } else {
                layer.generateWeights();
            }
        });
        console.log(`Generated network with ${neurons.length} layers`);
        return neurons;
    }

    runEpoch(dataset) {
        console.log(`Running Epoch: ${this.epochErrors.length + 1}`);
        let currentEpochErrors = [];
        for (let i = 0; i < dataset.length; i++) {
            this.runFeedforward(dataset[i]);
            this.runBackPropogation(dataset[i]);
            currentEpochErrors.push(this.neurons[this.neurons.length - 1].error);
        }
        // Calculate the error after the epoch is completed
        this.epochErrors.push(this.calculateEpochError(currentEpochErrors));
    }

    calculateEpochError(errors) {
        // Using RMS
        return Math.sqrt(errors.reduce((prev, curr) => prev + Math.pow(curr, 2), 0));
    }

    runFeedforward(data) {
        let finalOutput = this.feedForwardLoop(data);
        this.lastOutput = finalOutput;
        console.log(`Final activation value: ${this.lastOutput}`);
    }

    feedForwardLoop(datasetPart) {
        let previousActivations = [];
        console.log(`Feeding in: ${datasetPart.inputs} and expecting: ${datasetPart.target}`);
        // Leave out the output neuron
        for (let i = 0; i < this.neurons.length - 1; i++) {
            // for each neuron
            let layer = this.neurons[i];
            let inputs = datasetPart.inputs;
            // If we are not on the first hidden layer, then retrieve the inputs from the last layer
            if (previousActivations && previousActivations.length) {
                inputs = previousActivations;
            }
            console.log(`Layer ${i} inputs: ${inputs}`);
            let outputs = this.feedForward(inputs, layer);
            console.log(`Layer ${i} output: ${outputs}`);
            previousActivations = outputs.slice();
        }
        // Once hidden layers are finished, calculate for the output neuron
        let outputNeuron = this.neurons[this.neurons.length - 1];
        let output = this.feedForward(previousActivations, [outputNeuron]);
        return output[0];
    }

    feedForward(inputs, layer) {
        let layerActivations = [];
        for (let i = 0; i < layer.length; i++) {
            let neuron = layer[i];
            let net = neuron.calculateNet(inputs);
            let act = neuron.calculateActivation(net);
            neuron.log(`Inputs: ${inputs} Net: ${net}, Act: ${act}`);
            layerActivations.push(act);
        }
        return layerActivations;
    }

    runBackPropogation(data) {
        let outputNeuron = this.neurons[this.neurons.length - 1];
        let error = outputNeuron.calculateError(data.target, this.lastOutput);
        console.log(`Output Neuron error: ${error}`);
        this.backPropogateErrors(this.neurons[this.neurons.length - 2], [outputNeuron]);
        // Continue for all remaining layers
        // Leave out the last layer in the guard since we're moving in pairs
        for (let i = this.neurons.length - 2; i >= 1; i--) {
            this.backPropogateErrors(this.neurons[i - 1], this.neurons[i]);
        }
        console.log('Updating weights');
        this.backPropogateWeights();
    }

    backPropogateErrors(previousLayer, currentLayer) {
        console.log(`Back Propogating from layer ${currentLayer[0].layer} to layer ${previousLayer[0].layer}`);
        // Update the error of each previous neuron for each current neuron
        for (let i = 0; i < currentLayer.length; i++) {
            let currentNeuron = currentLayer[i];
            this.updateErrors(previousLayer, currentNeuron);
        }
    }

    updateErrors(previousLayer, currentNeuron) {
        for (let i = 0 ; i < previousLayer.length; i++) {
            let previousNeuron = previousLayer[i];
            let error = previousNeuron.calculateError(
                currentNeuron.error,
                currentNeuron.weights[i + 1],
                previousNeuron.activation
            );
            previousNeuron.log(`New calculated error: ${error} given ahead error: ${currentNeuron.error}, ahead weight: ${currentNeuron.weights[i + 1]} and self activation: ${previousNeuron.activation}`);
        }
    }

    backPropogateWeights() {
        for (let i = 0; i < this.neurons.length; i++) {
            let layer = this.neurons[i];
            // if it is an array, then it is a hidden layer
            if (layer && layer.length) {
                // Update the weights for each neuron
                for (let j = 0; j < layer.length; j++) {
                    let neuron = layer[j];
                    neuron.updateWeights();
                }
            } else {
                // Otherwise, layer is the output neuron
                layer.updateWeights();
            }
        }
    }

    testAccuracy(dataset, tolerance) {
        tolerance = tolerance || 0.01;
        let errors = [];
        dataset.forEach((part) => {
            console.log(`Testing accuracy against part: ${JSON.stringify(part)}`);
            let target = part.target;
            let output = this.feedForwardLoop(part);
            let error = target - output;
            errors.push(error);
            console.log(`Error: ${error}`);
        });
        let withinTolerance = 0;
        errors.map((error) => {
            if (Math.abs(error) <= tolerance) {
                withinTolerance += 1;
            }
        });
        return withinTolerance;
    }
}
