@echo off
echo Starting Restaurant Management System...
echo.

if not exist target\ (
    echo Building the application for the first time...
    call mvnw.cmd clean package -DskipTests
)

echo.
echo Running the application...
echo.
call mvnw.cmd spring-boot:run
pause 