@echo off

cd /d "%~dp0"

python -m http.server

timeout /t 3 /nobreak >nul

start http://localhost:8000/LMS.html

exit