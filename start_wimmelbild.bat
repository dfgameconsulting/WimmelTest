@echo off

REM Beende den Python-HTTP-Server, falls er läuft
for /f "tokens=5" %%i in ('netstat -aon ^| find "LISTENING" ^| find ":8000"') do (
    set PID=%%i
)

if defined PID (
    echo Beende Python-HTTP-Server...
    taskkill /pid %PID% /f
    echo Server wurde beendet.
) else (
    echo Python-HTTP-Server läuft nicht.
)

REM Starte den Python-HTTP-Server neu
python -m http.server

REM Warte für 3 Sekunden, damit der Server gestartet werden kann
timeout /t 3 /nobreak >nul

REM Öffne die Webseite im Standardbrowser
start http://localhost:8000/index.html