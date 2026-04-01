# Experiment 20: Cloud Deployment

Complete guide for deploying full-stack application to Azure.

## Overview

This experiment covers:
- Containerizing the React + Express application
- Setting up CI/CD pipeline
- Deploying to Azure (App Service or Container Instances)
- Database setup in Azure
- Monitoring and logging

---

## Architecture

```
┌─────────────────────────────────────────┐
│          Azure Front Door              │
│        (Global Load Balancer)          │
└──────────────┬──────────────────────────┘
               │
┌──────────────┴──────────────────────────┐
│     Azure App Service / Container       │
│  ┌────────────────────────────────────┐ │
│  │  React Frontend (Port 3000)        │ │
│  │  Express Backend (Port 3001)       │ │
│  │  (Both in containers or single app)│ │
│  └────────────────────────────────────┘ │
└──────────────┬──────────────────────────┘
               │
               ├── Azure SQL Database or MongoDB Atlas
               ├── Azure Storage (file uploads)
               └── Azure Key Vault (secrets)
```

---

## Step 1: Prepare for Deployment

### Dockerfile (Root Directory)

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

EXPOSE 3001

CMD ["npm", "start"]
```

### Docker Compose (docker-compose.yml)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:3001

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/app
      - JWT_SECRET=your-secret
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

---

## Step 2: Azure Setup

### Install Azure CLI

```bash
# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Login to Azure

```bash
az login
az account set --subscription "your-subscription-id"
```

### Create Resource Group

```bash
az group create \
  --name myResourceGroup \
  --location eastus
```

### Create Container Registry

```bash
az acr create \
  --resource-group myResourceGroup \
  --name myContainerRegistry \
  --sku Basic
```

---

## Step 3: Build and Push Docker Image

```bash
# Build image
docker build -t myapp:latest .

# Tag for Azure Container Registry
docker tag myapp:latest mycontainerregistry.azurecr.io/myapp:latest

# Login to ACR
az acr login --name myContainerRegistry

# Push to registry
docker push mycontainerregistry.azurecr.io/myapp:latest
```

---

## Step 4: Deploy to Azure App Service

### Create App Service Plan

```bash
az appservice plan create \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --is-linux \
  --sku B1
```

### Create Web App

```bash
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name myAppService \
  --deployment-container-image-name mycontainerregistry.azurecr.io/myapp:latest
```

### Configure Container Settings

```bash
az webapp config container set \
  --name myAppService \
  --resource-group myResourceGroup \
  --docker-custom-image-name mycontainerregistry.azurecr.io/myapp:latest \
  --docker-registry-server-url https://mycontainerregistry.azurecr.io
```

---

## Step 5: Setup Database

### Create Azure SQL Database

```bash
az sql server create \
  --name myserver \
  --resource-group myResourceGroup \
  --location eastus \
  --admin-user adminuser \
  --admin-password 'P@ssw0rd123'

az sql db create \
  --resource-group myResourceGroup \
  --server myserver \
  --name myappdb
```

### Or Use MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to App Service environment variables

---

## Step 6: Environment Variables

```bash
az webapp config appsettings set \
  --resource-group myResourceGroup \
  --name myAppService \
  --settings \
    MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/myapp" \
    JWT_SECRET="your-secret-key" \
    PORT=3001 \
    NODE_ENV=production
```

---

## Step 7: Setup CI/CD Pipeline

### GitHub Actions (create .github/workflows/deploy.yml)

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build -t myimage:latest .

      - name: Login to Azure Container Registry
        uses: azure/docker-login@v1
        with:
          login-server: mycontainerregistry.azurecr.io
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}

      - name: Push to ACR
        run: docker push mycontainerregistry.azurecr.io/myimage:latest

      - name: Deploy to Azure App Service
        uses: azure/webapps-deploy@v2
        with:
          app-name: myAppService
          images: mycontainerregistry.azurecr.io/myimage:latest
```

---

## Step 8: Monitoring

### Enable Application Insights

```bash
az monitor app-insights component create \
  --app myAppInsights \
  --location eastus \
  --resource-group myResourceGroup
```

### View Logs

```bash
# Stream logs
az webapp log tail --name myAppService --resource-group myResourceGroup

# Download logs
az webapp log download --name myAppService --resource-group myResourceGroup
```

---

## Step 9: Domain and SSL

### Map Custom Domain

```bash
az webapp config hostname add \
  --webapp-name myAppService \
  --resource-group myResourceGroup \
  --hostname mycustomdomain.com
```

### Free SSL Certificate

```bash
az webapp config ssl upload \
  --resource-group myResourceGroup \
  --name myAppService \
  --certificate-file mycert.pfx \
  --certificate-password password
```

---

## Step 10: Testing Deployed App

```bash
# Test API
curl https://myAppService.azurewebsites.net/api/health

# Test with authentication
curl -X POST https://myAppService.azurewebsites.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"pass123"}'
```

---

## Scaling

### Auto-scale Configuration

```bash
az monitor autoscale create \
  --resource-group myResourceGroup \
  --resource myAppService \
  --resource-type "Microsoft.Web/sites" \
  --min-count 1 \
  --max-count 10 \
  --resource-group-name myResourceGroup
```

---

## Cost Optimization

1. **Use appropriate pricing tiers**
   - Development: B1 (Shared)
   - Production: S1+ (Standard)

2. **Enable Auto-scale**
   - Scale down during off-peak hours

3. **Use CDN**
   - Cache static assets

4. **Database**
   - Use MongoDB Atlas free tier for testing
   - Scale appropriately for production

---

## Troubleshooting

### Application not starting

```bash
az webapp log tail --name myAppService --resource-group myResourceGroup
```

### Connection issues

```bash
# Check network connectivity
az network vnet subnet list --resource-group myResourceGroup

# Check firewall rules
az sql server firewall-rule list --server myserver --resource-group myResourceGroup
```

### Performance issues

```bash
# Check CPU and memory usage
az monitor metrics list \
  --resource /subscriptions/{subscription}/resourceGroups/{rg}/providers/Microsoft.Web/sites/{app} \
  --metric CpuPercentage
```

---

## Deployment Checklist

- ✅ Dockerfile created and tested locally
- ✅ Environment variables configured
- ✅ Database connection working
- ✅ Resource group created
- ✅ Container registry created
- ✅ App Service created
- ✅ CI/CD pipeline set up
- ✅ Custom domain configured
- ✅ SSL certificate applied
- ✅ Monitoring enabled
- ✅ Auto-scaling configured
- ✅ Backup strategy in place

---

## Learning Objectives

✓ Containerize full-stack application
✓ Set up Azure resources
✓ Deploy with Azure App Service
✓ Configure CI/CD pipeline
✓ Monitor deployed application
✓ Scale based on load
✓ Manage costs
✓ Troubleshoot issues

---

## Next Steps

1. Implement feature flags for A/B testing
2. Set up disaster recovery
3. Implement data replication
4. Add API rate limiting
5. Implement advanced caching strategy
