let getDataset = (amount) => {
    let amount = amount || 10;
    let dataset = [];
    for (let i = 0; i < amount; i++) {
        // let firstInput = Math.random();
        let firstInput = 1.0;
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

let getTestDataset = (amount) => {
    let amount = amount || 10;
    return getDataset(amount);
}

export { getDataset, getTestDataset };
