let getDataset = (amount) => {
    let amount = amount || 1000;
    let dataset = [];
    for (let i = 0; i < amount; i++) {
        let firstInput = Math.random();
        let secondInput = Math.random();
        dataset.push(
            {
                inputs: [firstInput, secondInput],
                target: firstInput * Math.sin(secondInput)
            }
        );
    }
    return dataset.slice();
};

export { getDataset };
