export const service = async () => {
    try {
        const response = await fetch('http://localhost:8080/services/index');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};