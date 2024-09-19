export const branchOffice = async () => {
    try {
        const response = await fetch('http://localhost:8080/branch_office/index');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

