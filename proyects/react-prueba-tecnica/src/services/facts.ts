const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

class NetworkError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'NetworkError';
    }
}
export const getRandomFact = async (): Promise<string> => {
    try {
        const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
        const data = await res.json()
        const fact: string = data.fact //destructurar el fact que es lo mismo verlo de esta forma const {fact} = datos;

        return fact;
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error('Network Error:', error.message);
        } else {
            console.error('Error:', error);
        }
        throw new Error('Unable to retrieve a random cat fact');
    }
}
