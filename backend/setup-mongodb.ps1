Write-Host "MongoDB Atlas Setup Guide" -ForegroundColor Yellow
Write-Host "=========================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://www.mongodb.com/cloud/atlas/register"
Write-Host "2. Create FREE account"
Write-Host "3. Create Shared Cluster (FREE)"
Write-Host "4. Create Database User:"
Write-Host "   - Username: taskmanager"
Write-Host "   - Password: (save this!)"
Write-Host "5. Add IP Whitelist (Allow from anywhere for development)"
Write-Host "6. Get Connection String"
Write-Host ""
Write-Host "Then update backend/.env file:" -ForegroundColor Green
Write-Host "MONGODB_URI=mongodb+srv://taskmanager:YOUR_PASSWORD@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority"
Write-Host ""
Write-Host "Test connection:" -ForegroundColor Cyan
Write-Host "cd backend"
Write-Host "npm run dev"