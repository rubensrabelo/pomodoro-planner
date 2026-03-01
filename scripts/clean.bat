@echo off
cls
title LIMPEZA_TOTAL

echo ======================================================
echo           EXECUTANDO FAXINA GERAL E FECHANDO TUDO
echo ======================================================

echo.
echo [1/4] Docker: Removendo containers e volumes...
docker compose -f .\backend\docker-compose.postgres.yml down -v >nul 2>&1

echo.
echo [2/4] Portas: Matando todos os processos Node.js...
taskkill /F /IM node.exe /T >nul 2>&1

echo.
echo [3/4] Docker: Prune (Limpeza de sistema)...
docker system prune -f >nul 2>&1

echo.
echo [4/4] Finalizando: Fechando todos os terminais em 3 segundos...
timeout /t 3

taskkill /F /IM cmd.exe