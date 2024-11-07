const API_BASE_URL = "http://localhost:8000/api";

export const uploadPDF = async(file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    return response.json();
};

export const askQuestion = async(question, filename) => {
    const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, filename }),
    });
    return response.json();
};

export const getDocuments = async() => {
    const response = await fetch(`${API_BASE_URL}/documents`);
    return response.json();
};