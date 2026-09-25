@echo off
echo ===================================================
echo   BAT DAU QUY TRINH CI/CD LOCAL - HOTEL MANAGEMENT
echo ===================================================

echo.
echo [1/3] Kiem tra va cap nhat code moi nhat tu Git...
git pull
if %errorlevel% neq 0 (
    echo [CANH BAO] Khong the pull code tu Git. Van tiep tuc deploy voi code hien tai...
)

echo.
echo [2/3] Xay dung lai cac Docker Image va khoi dong (Build & Deploy)...
docker compose up -d --build

echo.
echo [3/3] Don dep he thong (Xoa cac image/container cu khong dung)...
docker image prune -f

echo.
echo ===================================================
echo   TRIEN KHAI THANH CONG!
echo   Frontend:    http://localhost:3000
echo   Backend API: http://localhost:5000/api/health
echo   phpMyAdmin:  http://localhost:8080
echo ===================================================
pause
