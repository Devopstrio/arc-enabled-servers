// Devopstrio Azure Arc-Enabled Servers Platform 
// Hybrid Operations Infrastructure Orchestration

targetScope = 'subscription'

param location string = 'uksouth'
param prefix string = 'arc-ops'
param env string = 'prd'

// 1. Management Resource Group mapping actual Arc machines
resource rgHybrid 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-hybrid-nodes-${env}'
  location: location
  tags: {
    Purpose: 'Azure Arc Connected Machine Registration Bound'
  }
}

// 2. Control Plane Resource Group
resource rgPlatform 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-platform-${env}'
  location: location
}

// 3. Centralized Arc Monitoring (Log Analytics + Update Manager)
module monitoring './modules/monitoring.bicep' = {
  scope: rgPlatform
  name: 'monitoringDeploy'
  params: {
    location: location
    workspaceName: 'law-${prefix}-telemetry-${env}'
    automationAccountName: 'aa-${prefix}-patching-${env}'
  }
}

// 4. Platform Engines Fabric (AKS)
module platform './modules/aks-fabric.bicep' = {
  scope: rgPlatform
  name: 'platformDeploy'
  params: {
    location: location
    clusterName: 'aks-${prefix}-host-${env}'
    lawId: monitoring.outputs.workspaceId
  }
}

// 5. Metadata Database
module db './modules/postgres.bicep' = {
  scope: rgPlatform
  name: 'postgresDeploy'
  params: {
    location: location
    serverName: 'psql-${prefix}-meta-${env}'
  }
}

output lawId string = monitoring.outputs.workspaceId
output arcResourceGroup string = rgHybrid.name
output platformUrl string = platform.outputs.dashboardUri
