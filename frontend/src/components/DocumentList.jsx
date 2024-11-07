import React, { useEffect, useState } from "react";
import { getDocuments } from "../services/api";

const DocumentList = ({ selectedDocument, onSelectDocument }) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async() => {
            const response = await getDocuments();
            setDocuments(response.documents);
        };
        fetchDocuments();
    }, []);

    return ( <
        div className = "bg-white rounded-lg shadow-lg p-4" >
        <
        h2 className = "text-lg font-semibold mb-4" > Documents < /h2> <
        div className = "space-y-2" > {
            documents.map((doc) => ( <
                div key = { doc.id }
                className = { `p-3 rounded-lg cursor-pointer ${
              selectedDocument?.id === doc.id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }` }
                onClick = {
                    () => onSelectDocument(doc)
                } > { doc.filename } <
                /div>
            ))
        } <
        /div> < /
        div >
    );
};

export default DocumentList;