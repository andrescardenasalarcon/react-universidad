import { useState } from "react"

export const useTypeOperation = () => {
    const [typeOperation, setTypeOperation] = useState<string>('suma');

    const handleTypeOperation = (operation: string) => {
        setTypeOperation(operation);
    }

    return { typeOperation, handleTypeOperation }
}