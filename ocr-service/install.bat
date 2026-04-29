@echo off
cd /d D:\claims-automation-project\ocr-service
venv\Scripts\activate
pip install fastapi uvicorn pytesseract pillow python-multipart
echo Done. Press any key to exit.
pause > nul