@echo off

cd /d "%~dp0"

python -m http.server

timeout /t 3 /nobreak >nul

start http://localhost:8080/index.html

exit