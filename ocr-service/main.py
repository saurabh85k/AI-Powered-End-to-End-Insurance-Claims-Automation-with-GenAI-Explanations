from fastapi import FastAPI, UploadFile, File
import pytesseract
from PIL import Image
import io
import fitz  # PyMuPDF

app = FastAPI()
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_from_pdf(file_bytes):
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def extract_text_from_image(file_bytes):
    image = Image.open(io.BytesIO(file_bytes))
    return pytesseract.image_to_string(image)

@app.post("/extract")
async def extract_text(file: UploadFile = File(...)):
    contents = await file.read()
    filename = file.filename.lower()
    
    if filename.endswith('.pdf'):
        extracted = extract_text_from_pdf(contents)
    else:
        extracted = extract_text_from_image(contents)
    
    return {"extracted_text": extracted}