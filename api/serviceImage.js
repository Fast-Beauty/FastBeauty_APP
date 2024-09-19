export const serviceImage = async () => {
    try {
        const response = await fetch('http://localhost:8080/servicesimages/index');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};