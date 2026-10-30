import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  HardDrive, 
  Layers, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { WorkspaceMeta } from '../data/mockTelemetry';
import { TelemetryRun } from '../types';

interface WorkspaceDashboardProps {
  workspace: WorkspaceMeta;
  telemetryMap: Record<string, TelemetryRun>;
  d1Connected?: boolean;
  d1RunsCount?: number;
  onSelectProject: (workspaceSlug: string, projectSlug: string) => void;
  onOpenBuilder?: (projectSlug?: string) => void;
  onNavigateHome: () => void;
}

export const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({
  workspace,
  telemetryMap,
  d1Connected = true,
  d1RunsCount = 4,
  onSelectProject,
  onOpenBuilder,
}) => {
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCliCommand = () => {
    const cmd = `curl -s "https://uiqa-platform.pages.dev/api/telemetry" | jq .`;
    navigator.clipboard.writeText(cmd);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2500);
  };

  // Aggregated workspace metrics
  const totalProjects = workspace.projects.length;
  const totalTests = Object.values(telemetryMap).reduce((acc, curr) => acc + curr.totalTests, 0);
  const totalPassed = Object.values(telemetryMap).reduce((acc, curr) => acc + curr.passedCount, 0);
  const passRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 100;

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* Workspace Banner */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 dark:border-swiss-border gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1">
              <span>WORKSPACE COMMAND CENTER</span>
              <span>•</span>
              <span className="text-gray-500">{workspace.owner}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {workspace.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-3xl leading-relaxed">
              Radoss (ONE Business: Agency + Digital). Centralized autonomous QA telemetry, Cloudflare Edge evaluations, and zero-egress artifact repositories across all active portfolio projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold">
              Super Admin: Uchenna Innocent
            </span>
            <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold flex items-center space-x-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse"></span>
              <span>D1 Edge: {d1Connected ? 'Active' : 'Standby'} ({d1RunsCount} Runs)</span>
            </span>
            <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>R2 Binary Storage</span>
            </span>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
          <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 dark:text-swiss-muted mb-1">
              <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Projects</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-gray-900 dark:text-white">
              {totalProjects}
            </div>
            <div className="text-[11px] text-gray-500 font-sans mt-0.5">All Active &amp; Monitored</div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Workspace Pass Rate</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {passRate}%
            </div>
            <div className="text-[11px] text-gray-500 font-sans mt-0.5">{totalPassed}/{totalTests} tests green</div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 dark:text-swiss-muted mb-1">
              <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Dev RAM Toll</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-gray-900 dark:text-white">
              0.0 MB
            </div>
            <div className="text-[11px] text-gray-500 font-sans mt-0.5">100% Cloud Runners</div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border">
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 dark:text-swiss-muted mb-1">
              <HardDrive className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>R2 Egress Saved</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-gray-900 dark:text-white">
              $0.00
            </div>
            <div className="text-[11px] text-gray-500 font-sans mt-0.5">Cloudflare Zero Egress</div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 dark:text-swiss-muted mb-1">
              <Server className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Cloud Runner</span>
            </div>
            <div className="text-sm font-bold font-mono text-gray-900 dark:text-white truncate">
              Ubuntu 24.04
            </div>
            <div className="text-[11px] text-gray-500 font-sans mt-0.5">Node v24.2.0 • Headless</div>
          </div>
        </div>
      </div>

      {/* Projects Portfolio Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono">
              Monitored Workspace Projects ({workspace.projects.length})
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            {onOpenBuilder && (
              <button
                onClick={() => onOpenBuilder()}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <span>+ New Test Journey</span>
              </button>
            )}
            <span className="hidden md:inline text-xs font-mono text-gray-500 dark:text-swiss-muted">
              Select a project to inspect live telemetry and media library
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workspace.projects.map((proj) => {
            const tel = telemetryMap[proj.slug];
            return (
              <div
                key={proj.slug}
                className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 flex flex-col justify-between hover:border-blue-500 transition-colors group shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-none"></span>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {proj.name}
                        </h3>
                      </div>
                      <div className="text-xs font-mono text-gray-500 mt-0.5">
                        {proj.repo}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 shrink-0">
                      {proj.passRate}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  {/* Telemetry Snapshot Cards */}
                  {tel && (
                    <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border font-mono text-xs space-y-1 text-gray-600 dark:text-gray-400 mb-5">
                      <div className="flex justify-between">
                        <span>Latest SHA:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{tel.commitSha}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Run Duration:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{tel.durationSeconds}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Visual Artifacts:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{tel.artifacts.screenshotsCount} Captures</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200 dark:border-swiss-border">
                  <button
                    onClick={() => onSelectProject(workspace.slug, proj.slug)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <span>Inspect QA Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {onOpenBuilder && (
                    <button
                      onClick={() => onOpenBuilder(proj.slug)}
                      className="px-3 py-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/80 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-mono font-semibold transition-colors"
                      title="Build or Edit No-Code Journey"
                    >
                      <span>Build Journey</span>
                    </button>
                  )}

                  <a
                    href={proj.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-xs font-mono text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border flex items-center space-x-1.5 transition-colors"
                    title="Open Live Production App"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Workspace Execution Ledger */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-7 transition-colors">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-swiss-border">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono">
              Workspace Execution Ledger
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Automated cloud test runs dispatched via GitHub Actions across the Radoss portfolio.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            All Runners Normal
          </span>
        </div>

        <div className="overflow-x-auto border border-gray-200 dark:border-swiss-border">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-gray-100 dark:bg-[#0a0a0c] text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-swiss-border uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Project</th>
                <th className="py-2.5 px-4">Commit SHA</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Pass Rate</th>
                <th className="py-2.5 px-4">Duration</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-swiss-border">
              {workspace.projects.map((proj) => {
                const tel = telemetryMap[proj.slug];
                if (!tel) return null;
                return (
                  <tr key={proj.slug} className="hover:bg-gray-50 dark:hover:bg-[#14161c] transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                      {proj.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      <code>{tel.commitSha}</code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold">
                        PASSED
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {tel.passedCount}/{tel.totalTests} (100%)
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {tel.durationSeconds}s
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectProject(workspace.slug, proj.slug)}
                        className="px-2.5 py-1 text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-300 dark:border-blue-800 font-mono transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Local Agent Bridge Card */}
      <div className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-6 transition-colors">
        <div className="flex items-center space-x-2 mb-2 font-mono text-xs font-bold uppercase text-gray-900 dark:text-white">
          <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Local Agentic Bridge (Connecting AI Coding Assistants)</span>
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-400 mb-4 leading-relaxed font-sans">
          Your local agent (Antigravity, Claude Code, Cursor) consumes live QA feedback via this edge endpoint to automatically write and verify fixes locally with zero human typing:
        </p>
        <div className="p-3 bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border font-mono text-xs flex items-center justify-between">
          <code className="text-blue-700 dark:text-blue-300 overflow-x-auto whitespace-nowrap mr-3">
            curl -s "https://uiqa-platform.pages.dev/api/telemetry" | jq .
          </code>
          <button
            onClick={handleCopyCliCommand}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#222630] border border-gray-300 dark:border-swiss-border text-xs font-mono flex items-center space-x-1 text-gray-800 dark:text-gray-200 transition-colors"
          >
            {copiedCli ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
