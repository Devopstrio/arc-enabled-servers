-- Devopstrio Azure Arc Enabled Servers
-- Platform Operations Database Schema
-- Target: PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizational Mapping
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Operator', -- Admin, Architect, Operator, Viewer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hybrid Server Inventory
CREATE TABLE IF NOT EXISTS servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    hostname VARCHAR(255) NOT NULL,
    arc_resource_id VARCHAR(512) UNIQUE, -- The ARM ID once onboarded to Azure
    ip_address VARCHAR(50),
    os_type VARCHAR(50) NOT NULL, -- Windows, Linux
    os_version VARCHAR(100),
    hardware_provider VARCHAR(50), -- VMware, Hyper-V, AWS, Physical
    status VARCHAR(50) DEFAULT 'Discovered', -- Discovered, Onboarding, Connected, Offline, Decommissioned
    owner_id UUID REFERENCES users(id),
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_heartbeat TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS server_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    tag_match_rules JSONB, -- Dynamic grouping based on Azure Tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Asynchronous Operations Logs
CREATE TABLE IF NOT EXISTS operations_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    job_type VARCHAR(100) NOT NULL, -- 'Bulk_Onboard', 'Run_Script', 'Install_Extension'
    target_scope JSONB NOT NULL, -- list of server IDs or Group IDs
    status VARCHAR(50) DEFAULT 'Queued', -- Queued, Running, Failed, Success, Partial
    log_output TEXT,
    executed_by UUID REFERENCES users(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Patch Management State
CREATE TABLE IF NOT EXISTS patch_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES server_groups(id) ON DELETE CASCADE,
    maintenance_window_start TIMESTAMP WITH TIME ZONE NOT NULL,
    maintenance_window_end TIMESTAMP WITH TIME ZONE NOT NULL,
    classifications_to_include JSONB NOT NULL, -- ['Critical', 'Security']
    reboot_setting VARCHAR(50) DEFAULT 'IfRequired', -- Always, Never, IfRequired
    status VARCHAR(50) DEFAULT 'Scheduled',
    created_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS patch_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES patch_jobs(id) ON DELETE CASCADE,
    server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
    patches_installed INT DEFAULT 0,
    patches_failed INT DEFAULT 0,
    status VARCHAR(50) NOT NULL, -- Success, Failed, Excluded
    rebooted BOOLEAN DEFAULT false,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes 
CREATE INDEX idx_servers_status ON servers(status);
CREATE INDEX idx_servers_tenant ON servers(tenant_id);
CREATE INDEX idx_ops_jobs ON operations_jobs(status, job_type);
