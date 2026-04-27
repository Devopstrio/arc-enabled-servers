import React from 'react';

// Devopstrio Azure Arc Platform Portal
// High-Level Dashboard: Patching, Operations, Security

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-500/30">
            {/* Enterprise Topbar */}
            <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/30">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                        </div>
                        <h1 className="text-lg font-bold text-slate-900 tracking-tight">Arc Fleet Operations</h1>
                    </div>
                    <nav className="flex gap-6 text-sm font-semibold">
                        <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-5 pt-5">Command Center</a>
                        <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors pt-5 pb-5">Patch Compliance</a>
                        <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors pt-5 pb-5">Runbooks</a>
                        <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors pt-5 pb-5">Security Extensions</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-8 py-8">
                {/* Global Fleet Metrics */}
                <h2 className="text-xl font-bold mb-6">Global Hybrid Fleet</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Managed Servers', value: '14,205', alert: false, trend: '+45 This Month' },
                        { label: 'Arc Agent Offline', value: '15', alert: true, trend: 'Investigate Connectivity' },
                        { label: 'Patch Compliance', value: '97.4%', alert: false, trend: 'Target: 98%' },
                        { label: 'Policy Drift Detected', value: '112', alert: true, trend: 'Missing Defender Ext' }
                    ].map((kpi, idx) => (
                        <div key={idx} className={`bg-white p-6 rounded-xl border ${kpi.alert ? 'border-rose-200 shadow-[0_4px_20px_rgba(225,29,72,0.05)]' : 'border-slate-200 shadow-sm'}`}>
                            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">{kpi.label}</div>
                            <div className={`text-3xl font-black ${kpi.alert ? 'text-rose-600' : 'text-slate-800'}`}>{kpi.value}</div>
                            <div className="text-xs text-slate-400 mt-2 font-mono">{kpi.trend}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Operations Terminal Placeholder */}
                    <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold">Active Fleet Topology</h3>
                            <button className="bg-white border border-slate-300 text-xs px-3 py-1.5 rounded font-semibold text-slate-700 hover:bg-slate-50">Filter Options</button>
                        </div>

                        <div className="p-6 flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
                            {/* Abstract Topology Groupings */}
                            <div className="absolute top-10 left-10 w-48 bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm">
                                <h4 className="font-bold text-xs mb-2 text-slate-500 flex items-center justify-between">On-Premises VMware <span className="text-blue-600 bg-blue-50 px-2 rounded-full">2,605</span></h4>
                                <div className="flex gap-1 flex-wrap">
                                    {[...Array(12)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-emerald-400"></div>)}
                                    <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                                </div>
                            </div>

                            <div className="absolute top-10 right-10 w-48 bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm">
                                <h4 className="font-bold text-xs mb-2 text-slate-500 flex items-center justify-between">AWS EC2 Instances <span className="text-orange-500 bg-orange-50 px-2 rounded-full">3,200</span></h4>
                                <div className="flex gap-1 flex-wrap">
                                    {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-emerald-400"></div>)}
                                </div>
                            </div>

                            <div className="absolute bottom-10 left-1/3 w-48 bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm">
                                <h4 className="font-bold text-xs mb-2 text-slate-500 flex items-center justify-between">Native Azure VMs <span className="text-blue-500 bg-blue-50 px-2 rounded-full">8,400</span></h4>
                                <div className="flex gap-1 flex-wrap">
                                    {[...Array(20)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-emerald-400"></div>)}
                                </div>
                            </div>

                            {/* Center Hub */}
                            <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex flex-col items-center justify-center font-bold text-sm shadow-xl z-10 relative">
                                Azure Arc
                                <span className="text-[10px] font-normal text-blue-200">Control Plane</span>
                            </div>

                            {/* Connector Lines */}
                            <svg className="absolute inset-0 w-full h-full z-0" pointerEvents="none">
                                <path d="M 150 100 L 50% 50%" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                <path d="M 80% 100 L 50% 50%" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                <path d="M 40% 80% L 50% 50%" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                    </div>

                    {/* Quick Actions & Jobs */}
                    <div className="flex flex-col gap-6">

                        {/* Quick Action Panel */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold mb-4">Operations Dispatcher</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors flex items-center justify-between group">
                                    <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-700">Deploy Log Analytics Agent</span>
                                    <span className="bg-slate-200 text-slate-500 text-[10px] uppercase font-bold px-2 py-1 rounded">112 Targets</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors flex items-center justify-between group">
                                    <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-700">Trigger Critical Patch Ring</span>
                                    <span className="bg-slate-200 text-slate-500 text-[10px] uppercase font-bold px-2 py-1 rounded">Global</span>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors flex items-center justify-between group">
                                    <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-700">Scan Untagged Network Segments</span>
                                </button>
                            </div>
                        </div>

                        {/* Recent Job Queue */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 flex-1">
                            <h3 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-500 border-b border-slate-100 pb-2">Active Jobs</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm">
                                    <div>
                                        <div className="font-semibold">Bulk Onboard (Retail Branch)</div>
                                        <div className="text-xs text-slate-400">14 / 22 Nodes Connected</div>
                                    </div>
                                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <div>
                                        <div className="font-semibold text-slate-500">Defender Extension Push</div>
                                        <div className="text-xs text-slate-400">Completed 4 mins ago</div>
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
