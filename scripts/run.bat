@echo off
cls
title ORQUESTRADOR_MESTRE

echo EXECUTANDO O AMBIENTE DE DESENVOLVIMENTO

echo.
echo [1/3] Subindo container do postgres...
docker compose -f .\backend\docker-compose.postgres.yml up -d

echo.
echo [2/3] Abrindo Backend em nova janela...
start "BACKEND" /D ".\backend" cmd /k "npm run dev"

echo.
echo [3/3] Abrindo Frontend em nova janela...
start "FRONTEND" /D ".\frontend" cmd /k "npm run dev"

echo.
echo ======================================================
echo  AMBIENTE DISPARADO! 
echo.
echo  As janelas do Back e Front estao abertas separadamente.
echo ======================================================
echo.

