export function EnumTypeOperation(num1: number, num2: number) {
    return [
        { name: 'suma', operation: num1 + num2 },
        { name: 'resta', operation: num1 - num2 },
        { name: 'multiplicacion', operation: num1 * num2 },
        { name: 'division', operation: num1 / num2 },
    ]
};
