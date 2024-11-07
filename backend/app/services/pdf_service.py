from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from ..models import Document

def process_pdf(file, file_path):
    with open(file_path, "wb") as buffer:
        content = file.file.read()
        buffer.write(content)
    
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    
    text_splitter = CharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    
    texts = text_splitter.split_documents(pages)
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(texts, embeddings)
    vectorstore.save_local(f"{file_path}.faiss")
    
    return Document(
        filename=file.filename,
        file_path=file_path,
        vector_store_path=f"{file_path}.faiss"
    )
