@echo off
cd /d D:\claims-automation-project\ocr-service
venv\Scripts\activate
uvicorn main:app --reload --port 8001
pause