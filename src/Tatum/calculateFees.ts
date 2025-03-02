const calculateFees = (price: number, feesPercentage: number = 0.4): number => {
    return (price * feesPercentage) / 100;
};

export {calculateFees}