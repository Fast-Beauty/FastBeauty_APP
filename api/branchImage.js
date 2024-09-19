export const branchImage = async () => {
    try {
        const response = await fetch('http://localhost:8080/branchimages/index');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

