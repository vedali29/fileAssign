from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings

def get_answer(file_path, question):
    vectorstore = FAISS.load_local(f"{file_path}.faiss", OpenAIEmbeddings())
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=OpenAI(temperature=0),
        chain_type="stuff",
        retriever=vectorstore.as_retriever()
    )
    
    return qa_chain.run(question)
