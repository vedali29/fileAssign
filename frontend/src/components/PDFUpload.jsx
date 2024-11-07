import React, { useState } from "react";
import { uploadPDF } from "../services/api";

const PDFUpload = ({ onUploadSuccess }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleDrop = async(e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            await handleUpload(file);
        }
    };

    const handleUpload = async(file) => {
        setIsUploading(true);
        try {
            const response = await uploadPDF(file);
            onUploadSuccess(response);
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return ( <
        div className = { `border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }` }
        onDragOver = {
            (e) => {
                e.preventDefault();
                setIsDragging(true);
            }
        }
        onDragLeave = {
            () => setIsDragging(false)
        }
        onDrop = { handleDrop } >
        <
        input type = "file"
        id = "file-upload"
        className = "hidden"
        accept = ".pdf"
        onChange = {
            (e) => handleUpload(e.target.files[0])
        }
        /> <
        label htmlFor = "file-upload"
        className = "cursor-pointer" >
        <
        div className = "text-gray-500" > {
            isUploading ? ( <
                div className = "animate-pulse" > Uploading... < /div>
            ) : ( <
                >
                <
                svg className = "mx-auto h-12 w-12 text-gray-400"
                stroke = "currentColor"
                fill = "none"
                viewBox = "0 0 48 48" >
                <
                path d = "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth = { 2 }
                strokeLinecap = "round"
                strokeLinejoin = "round" /
                >
                <
                /svg> <
                p className = "mt-1" > Drop PDF here or click to upload < /p> < /
                >
            )
        } <
        /div> < /
        label > <
        /div>
    );
};

export default PDFUpload;