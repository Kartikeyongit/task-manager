Write-Host "Testing Task Manager API..." -ForegroundColor Yellow
Write-Host "==========================" -ForegroundColor Yellow

# Test Health Check
Write-Host "`n1. Testing Health Check:" -ForegroundColor Cyan
$health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
Write-Host "   Status: $($health.status)" -ForegroundColor Green

# Test Registration
Write-Host "`n2. Testing User Registration:" -ForegroundColor Cyan
$body = @{
    name = "API Test User"
    email = "apitest_$(Get-Random)@example.com"
    password = "test123"
} | ConvertTo-Json

try {
    $register = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
    Write-Host "   Registration Successful!" -ForegroundColor Green
    Write-Host "   User ID: $($register.user.id)"
    Write-Host "   Token: $($register.token.substring(0, 20))..."
} catch {
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host "`n✅ API Tests Complete!" -ForegroundColor Green
Write-Host "`nManual Tests to Run:" -ForegroundColor Yellow
Write-Host "1. Register: POST http://localhost:5000/api/auth/register"
Write-Host "2. Login: POST http://localhost:5000/api/auth/login"
Write-Host "3. Create Task: POST http://localhost:5000/api/tasks (with token)"