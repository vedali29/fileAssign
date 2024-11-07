import React, { useState, useRef, useEffect } from "react";
import { askQuestion } from "../services/api";

const ChatInterface = ({ documentId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current ? .scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!input.trim() || !documentId) return;

        const userMessage = { type: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await askQuestion(documentId, input);
            setMessages((prev) => [
                ...prev,
                {
                    type: "assistant",
                    content: response.answer,
                },
            ]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return ( <
        div className = "flex flex-col h-[600px] bg-white rounded-lg shadow-lg" >
        <
        div className = "flex-1 overflow-y-auto p-4 space-y-4" > {
            messages.map((message, index) => ( <
                div key = { index }
                className = { `flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }` } >
                <
                div className = { `max-w-[70%] rounded-lg px-4 py-2 ${
                message.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }` } > { message.content } <
                /div> < /
                div >
            ))
        } {
            isLoading && ( <
                div className = "flex justify-start" >
                <
                div className = "bg-gray-100 rounded-lg px-4 py-2" > Thinking... <
                /div> <
                /
                div >
            )
        } <
        div ref = { messagesEndRef }
        /> < /
        div >

        <
        form onSubmit = { handleSubmit }
        className = "p-4 border-t" >
        <
        div className = "flex space-x-4" >
        <
        input type = "text"
        value = { input }
        onChange = {
            (e) => setInput(e.target.value)
        }
        className = "flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder = "Ask a question..."
        disabled = {!documentId }
        /> <
        button type = "submit"
        disabled = {!documentId || isLoading }
        className = "bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50" >
        Send <
        /button> < /
        div > <
        /form> < /
        div >
    );
};

export default ChatInterface;