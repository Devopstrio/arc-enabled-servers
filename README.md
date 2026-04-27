<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="85" alt="Devopstrio Logo" />

<h1>Azure Arc-Enabled Servers Platform</h1>

<p><strong>Enterprise Control Plane for Hybrid, Multi-Cloud, and Edge Server Fleet Operations</strong></p>

[![Architecture](https://img.shields.io/badge/Architecture-Hybrid_Ops-522c72?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)
[![Cloud](https://img.shields.io/badge/Platform-Azure_Native-0078d4?style=for-the-badge&logo=microsoftazure&labelColor=000000)](/terraform)
[![Fleet](https://img.shields.io/badge/Scale-10k+_Servers-962964?style=for-the-badge&labelColor=000000)](/apps/onboarding-engine)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)

</div>

---

## 🏛️ Executive Summary

![Arc-Enabled Servers Architecture](assets/diagram-architecture.png)

The **Azure Arc-Enabled Servers Platform** centralizes operations, governance, and security for hybrid server fleets scaling into the tens of thousands. By utilizing Azure Arc as the ultimate control plane, enterprises can manage AWS EC2 instances, on-premises VMware VMs, and branch-office Linux machines seamlessly alongside native Azure resources.

### Strategic Business Outcomes
- **Unified Patch Management**: Schedule, execute, and guarantee Update Management across Windows and Linux regardless of their physical network location.
- **Agentless Onboarding**: The background Discovy Engine sweeps corporate networks, deploying Connected Machine agents dynamically to orphaned IT assets.
- **Policy Enforcement**: Push Azure Policy (Defender configs, log analytics extensions) instantly to thousands of non-Azure machines.
- **Single Pane of Glass**: A central dashboard combining performance metrics, security alerts, and missing patch inventories.

---

## 🏗️ Technical Architecture Details

### 1. High-Level Architecture
```mermaid
graph TD
    Azure[Azure Control Plane] --> Arc[Azure Arc Connected Machine Agent]
    Arc --> AWS[AWS EC2]
    Arc --> GCP[GCP Compute]
    Arc --> OnPrem[On-Prem VMware/Hyper-V]
    UI[Hybrid Ops Portal] --> API[Platform API Gateway]
    API --> Onboard[Onboarding Engine]
    API --> Patch[Patch Engine]
    Onboard --> Azure
```

### 2. Arc Agent Onboarding Workflow
```mermaid
sequenceDiagram
    participant Engine as Onboarding Engine
    participant Target as On-Prem Server
    participant Azure as Azure ARM
    
    Engine->>Target: 1. WinRM / SSH Discovery
    Engine->>Azure: 2. Request Service Principal Token
    Engine->>Target: 3. Download & Install `azcmagent`
    Target->>Azure: 4. Connect to Azure Arc endpoint (Outbound 443)
    Azure-->>Engine: 5. Server mapped in Resource Group
    Engine->>Azure: 6. Apply Tagging & Policies
```

### 3. Patch Lifecycle Flow
```mermaid
graph LR
    API[WSUS / Linux Repo] --> Arc[Azure Update Manager]
    Arc --> Eval[Periodic Assessment]
    Eval --> DB[(Findings Metadata)]
    DB --> PatchEngine[Patch Engine]
    PatchEngine --> MaintenanceWindow[Approval Gate]
    MaintenanceWindow --> Install[Trigger Arc Extension: Install]
    Install --> Reboot[Reboot Orchestration]
```

### 4. Policy Compliance Integration
```mermaid
graph TD
    Server[Arc Enabled Server] --> Pol[Azure Policy Agent]
    Pol --> Audit[Detect Missing Defender]
    Audit --> Remediate[Deploy Defender Extension via MSI]
    Remediate --> Log[Update Compliance Reporting Engine]
```

### 5. Multi-Tenant Tagging Model
```mermaid
graph TD
    DB[(Control Plane DB)]
    DB --> TeamA[Team: Core Infrastructure]
    DB --> TeamB[Team: Retail Applications]
    TeamA --> TagA[CostCenter: 900, Env: Prod, Owner: Core]
    TeamB --> TagB[CostCenter: 400, Env: Edge, Owner: Retail]
    TagA --> ServerXYZ
```

### 6. Security Trust Boundary
```mermaid
graph TD
    Agent[azcmagent (Hybrid Server)] -->|Outbound 443 / TLS 1.2| ArcLink[Azure Arc Gateway]
    ArcLink --> Entra[Entra ID Authentication]
    Entra --> ARM[Azure Resource Manager]
    note left of Agent: No inbound ports required on firewalls
```

### 7. AKS Operations Topology
```mermaid
graph TD
    subgraph Kube_System
        API[Platform API Pods]
        Onboard[Onboarding Worker Pods]
        Patch[Patch Orchestrator Pods]
    end
    API --> Redis[(Job Queue)]
    Redis --> Onboard
    Redis --> Patch
```

### 8. Analytics & Monitoring Flow
```mermaid
graph TD
    Agent[Azure Monitor Agent (AMA)] --> Log[Azure Log Analytics Workspace]
    Log --> Alert[Azure Monitor Alerts]
    Log --> Grafana[Security Posture Dashboards]
    Alert --> Hook[ServiceNow Webhook]
```

### 9. Operations Automation (Ops Engine)
```mermaid
graph TD
    User --> Portal[Ops Portal]
    Portal --> Script[Issue Custom Bash/PS1]
    Script --> Arc[Arc Run Command Extension]
    Arc --> Server[Hybrid VM]
    Server -->|Stdout| EventHub[Azure Event Hubs]
```

### 10. Service Principal Zero-Trust Rollout
```mermaid
graph LR
    Engine[Onboarding Engine] --> KV[Azure Key Vault]
    KV -->|Retrieve Short-Lived Cred| Engine
    Engine --> AgentInstall[Inject into azcmagent]
    AgentInstall -->|Connect| Arc[Azure]
    Arc -->|Auth Success| KV_Expire[Credential Auto-Expires]
```

---

## 🛠️ Global Platform Engines

| Engine | Directory | Purpose |
|:---|:---|:---|
| **Portal UI** | `apps/portal/` | The Next.js unified command center for fleet operations. |
| **Platform API** | `backend/src/` | Centralized router managing asynchronous Arc jobs. |
| **Onboarding Engine**| `apps/onboarding-engine/`| Automates the network-wide discovery and silent installation of `azcmagent`. |
| **Patch Engine** | `apps/patch-engine/` | Interacts with Azure Update Manager to orchestrate bulk patching rings. |
| **Inventory Engine** | `apps/inventory-engine/`| Syncs hardware, OS, and software signatures derived from Guest Configurations. |

---

## 🚀 Environment Bootstrapping

Deploy the foundation infrastructure to establish the Arc Operations hub.

```bash
cd bicep
az deployment sub create --name arc-platform --location uksouth --template-file main.bicep
```

---
<sub>&copy; 2026 Devopstrio &mdash; Mastering the Hybrid Datacenter.</sub>
