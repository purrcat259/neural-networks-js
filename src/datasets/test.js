const dataset = [
    {
        inputs: [0.23, 0.45],
        target: 0.32
    },
    {
        inputs: [0.78, 0.32],
        target: 0.64
    },
    {
        inputs: [0.86, 0.12],
        target: 0.53
    },
    {
        inputs: [0.12, 0.76],
        target: 0.19
    }
];

let getDataset = () => {
    return dataset.slice();
};

export { getDataset };
