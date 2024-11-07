import React, { useState } from "react";
import PDFUpload from "./components/PDFUpload";
import ChatInterface from "./components/ChatInterface";
import DocumentList from "./components/DocumentList";

function App() {
    const [selectedDocument, setSelectedDocument] = useState(null);

    return ( <
        div className = "min-h-screen bg-gray-100" >
        <
        div className = "max-w-7xl mx-auto px-4 py-8" >
        <
        PDFUpload onUploadSuccess = {
            (doc) => setSelectedDocument(doc)
        }
        /> <
        div className = "mt-8 grid grid-cols-12 gap-6" >
        <
        div className = "col-span-3" >
        <
        DocumentList selectedDocument = { selectedDocument }
        onSelectDocument = { setSelectedDocument }
        /> < /
        div > <
        div className = "col-span-9" >
        <
        ChatInterface documentId = { selectedDocument ? .id }
        /> < /
        div > <
        /div>  <
        /div > <
        /div>
    );
}

export default App;