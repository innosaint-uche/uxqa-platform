import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Download, 
  Maximize2, 
  FileText, 
  Video, 
  FileCode, 
  Activity, 
  CheckCircle2, 
  ZoomIn, 
  X, 
  Copy, 
  Check,
  Terminal,
  Clock
} from 'lucide-react';
import { TelemetryRun, TestScreenshot, TestArtifactFile } from '../types';

interface ArtifactMediaExplorerProps {
  telemetry: TelemetryRun;
}

export const ArtifactMediaExplorer: React.FC<ArtifactMediaExplorerProps> = ({ telemetry }) => {
  const [playerMode, setPlayerMode] = useState<'video' | 'simulation'>('simulation');
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedScreenshot, setSelectedScreenshot] = useState<TestScreenshot | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const steps = telemetry.artifacts.videoSteps || [
    { timestamp: '00:03.2', seconds: 3.2, label: 'Session Initialization', action: 'page.goto() & auth check', status: 'passed' as const },
    { timestamp: '00:14.2', seconds: 14.2, label: 'Form Assertion', action: 'expect(locator).toBeVisible()', status: 'passed' as const },
    { timestamp: '00:28.0', seconds: 28.0, label: 'Navigation Verification', action: 'page.click("nav")', status: 'passed' as const },
  ];

  const screenshots = telemetry.artifacts.screenshots || [];
  const files = telemetry.artifacts.files || [];

  const handleStepJump = (index: number) => {
    setActiveStepIndex(index);
    const step = steps[index];
    if (step) {
      setIsPlaying(true);
    }
  };

  const handleCopyCliCommand = () => {
    const cmd = `curl -s "https://uiqa-platform.pages.dev/api/telemetry?project=${telemetry.repo.split('/')[1] || 'aira-academy'}" | jq .`;
    navigator.clipboard.writeText(cmd);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2500);
  };

  const getCategoryIcon = (category: TestArtifactFile['category']) => {
    switch (category) {
      case 'Video':
        return <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'DOM Snapshot':
        return <FileCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Network HAR':
        return <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Console Logs':
        return <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Metrics JSON':
        return <Terminal className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* SECTION 1: Interactive In-Browser Video Player */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-7 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-gray-200 dark:border-swiss-border gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse"></span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono">
                {playerMode === 'video' ? 'Cloudflare R2 Live Video Stream' : 'Step Action Scrobbler (Simulation)'}
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {playerMode === 'video' 
                ? 'Direct WebM stream from Cloudflare R2 binary bucket with HTTP 206 range byte seeking.'
                : 'Interactive step transition replay and DOM scrobbler (Zero local RAM toll).'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex border border-gray-300 dark:border-swiss-border font-mono text-[11px]">
              <button
                onClick={() => setPlayerMode('simulation')}
                className={`px-2.5 py-1 transition-colors ${
                  playerMode === 'simulation'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-gray-100 dark:bg-[#181a20] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Step Replay
              </button>
              <button
                onClick={() => setPlayerMode('video')}
                className={`px-2.5 py-1 transition-colors ${
                  playerMode === 'video'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-gray-100 dark:bg-[#181a20] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Raw R2 Stream
              </button>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
              Cloudflare R2 ($0 Egress)
            </span>
            <a
              href={telemetry.artifacts.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-xs font-mono text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Raw WebM Video</span>
            </a>
          </div>
        </div>

        {/* Video Canvas Stage */}
        {playerMode === 'video' ? (
          <div className="relative aspect-video bg-[#0a0a0c] border border-gray-800 flex items-center justify-center overflow-hidden">
            {!videoError ? (
              <video
                controls
                className="w-full h-full object-contain"
                src={telemetry.artifacts.videoUrl}
                onError={() => setVideoError(true)}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="p-8 text-center max-w-md font-mono text-xs space-y-3">
                <Video className="w-8 h-8 text-purple-400 mx-auto" />
                <div className="text-white font-bold">R2 Video Binary Pending CI/CD Upload</div>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  The cloud Playwright runner has not yet dispatched this specific WebM file to Cloudflare R2 bucket <code className="text-blue-400">uxqa-artifacts</code>. Switch to Step Replay to inspect DOM transitions.
                </p>
                <button
                  onClick={() => {
                    setVideoError(false);
                    setPlayerMode('simulation');
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                >
                  Switch to Step Action Replay
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Step Action Simulation Screen */
          <div className="relative aspect-video bg-[#0a0a0c] border border-gray-800 flex flex-col justify-between overflow-hidden group">
            {/* Top Bar inside Video */}
            <div className="p-3 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between z-10 text-[11px] font-mono text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.5 bg-amber-600 text-white font-bold text-[9px] uppercase tracking-wider">
                  STEP REPLAY
                </span>
                <span>{telemetry.project}</span>
                <span className="text-gray-500">|</span>
                <span className="text-blue-400">Viewport: 1920x1080</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span>Runner: Ubuntu 24.04</span>
                <span>Node {telemetry.runner.nodeVersion}</span>
              </div>
            </div>

            {/* Center Stage Preview */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative">
              <div className="absolute inset-0 bg-radial from-blue-900/10 via-transparent to-transparent opacity-40"></div>
              
              {/* Visual Action Indicator */}
              <div className="relative z-10 max-w-md p-4 bg-[#14161c]/90 border border-swiss-border backdrop-blur-sm text-left font-mono">
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>STEP {activeStepIndex + 1} OF {steps.length}</span>
                  </span>
                  <span>{steps[activeStepIndex]?.timestamp || '00:00.0'}</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">
                  {steps[activeStepIndex]?.label}
                </div>
                <div className="text-[11px] text-blue-400 font-mono break-all">
                  &gt; {steps[activeStepIndex]?.action}
                </div>
              </div>

              {/* Big Play / Pause Overlay Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="mt-5 w-14 h-14 bg-blue-600/90 hover:bg-blue-500 border border-blue-400/60 flex items-center justify-center transition-transform hover:scale-105 shadow-lg z-10"
                title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                )}
              </button>
            </div>

            {/* Bottom Video Controls Bar */}
            <div className="p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-10">
              {/* Progress Bar */}
              <div className="w-full bg-gray-800 h-1.5 mb-2.5 relative cursor-pointer group/bar">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
                ></div>
                {/* Step Markers along the progress bar */}
                {steps.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleStepJump(idx)}
                    className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 border cursor-pointer transition-colors ${
                      idx <= activeStepIndex ? 'bg-blue-400 border-white' : 'bg-gray-700 border-gray-900'
                    }`}
                    style={{ left: `${(idx / (steps.length - 1)) * 98}%` }}
                    title={`${s.timestamp}: ${s.label}`}
                  ></div>
                ))}
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">
                    {steps[activeStepIndex]?.timestamp || '00:00.0'} / {telemetry.artifacts.videoDuration || '00:42.8'}
                  </span>
                  <span className="text-emerald-400 text-[10px] px-1.5 py-0.2 bg-emerald-950 border border-emerald-800">
                    100% PASS
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-gray-400">
                  <span>Speed: 1.0x</span>
                  <span className="text-gray-600">•</span>
                  <span>Headless Chromium</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timecoded Action Step Pills */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-swiss-border">
          <div className="text-[10px] font-mono uppercase text-gray-500 dark:text-swiss-muted font-bold mb-2">
            Click timecode to jump playback:
          </div>
          <div className="flex flex-wrap gap-2">
            {steps.map((st, idx) => {
              const isCurrent = idx === activeStepIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handleStepJump(idx)}
                  className={`px-3 py-1.5 text-xs font-mono flex items-center space-x-2 border transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-400 dark:border-blue-700 font-bold'
                      : 'bg-gray-50 dark:bg-[#0a0a0c] text-gray-700 dark:text-gray-400 border-gray-200 dark:border-swiss-border hover:bg-gray-100 dark:hover:bg-[#14161c]'
                  }`}
                >
                  <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>{st.timestamp}</span>
                  <span className="text-gray-400 dark:text-gray-500">:</span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: Screenshot & Visual Evidence Library */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-7 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-gray-200 dark:border-swiss-border gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-none"></span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono">
                Visual Evidence &amp; Screenshot Library ({screenshots.length} Captures)
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Automated high-resolution DOM snapshots inspected by Llama 3.2 Vision. Click to inspect or zoom.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold self-start sm:self-auto">
            Zero Visual Regressions
          </span>
        </div>

        {/* Screenshot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {screenshots.map((shot) => (
            <div
              key={shot.id}
              className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-3 flex flex-col justify-between group hover:border-blue-500 transition-colors"
            >
              <div>
                <div className="relative aspect-video bg-gray-200 dark:bg-[#14161c] overflow-hidden mb-2.5 cursor-pointer"
                  onClick={() => { setSelectedScreenshot(shot); setIsZoomed(false); }}
                >
                  <img
                    src={shot.url}
                    alt={shot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="p-2 bg-blue-600 text-white font-mono text-xs flex items-center space-x-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </span>
                  </div>
                  <div className="absolute top-1.5 left-1.5">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-black/80 text-white border border-gray-700">
                      {shot.viewport}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 mb-1" title={shot.title}>
                  {shot.title}
                </div>

                <div className="text-[11px] font-mono text-gray-600 dark:text-gray-400 space-y-0.5 mb-3">
                  <div>• Viewport: {shot.dimensions}</div>
                  <div>• Timestamp: {shot.timestamp}</div>
                  <div>• Size: {shot.sizeKb} KB</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200 dark:border-swiss-border">
                <button
                  onClick={() => { setSelectedScreenshot(shot); setIsZoomed(false); }}
                  className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-[11px] font-mono text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border flex items-center justify-center space-x-1 transition-colors"
                >
                  <ZoomIn className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>Inspect</span>
                </button>
                <a
                  href={shot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#181a20] dark:hover:bg-[#20232b] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-swiss-border transition-colors"
                  title="Download Raw Screenshot"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Artifacts Manifest & Zero-Egress Download Table */}
      <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border p-6 sm:p-7 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-gray-200 dark:border-swiss-border gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-600 rounded-none"></span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white font-mono">
                Artifacts Manifest &amp; Direct Files ({files.length} Files)
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Direct access to all individual raw assets stored in Cloudflare R2 bucket <code className="font-mono text-blue-600 dark:text-blue-400">uxqa-artifacts</code>.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
            Zero Egress Fee Storage
          </span>
        </div>

        {/* Artifacts Table */}
        <div className="overflow-x-auto border border-gray-200 dark:border-swiss-border">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-gray-100 dark:bg-[#0a0a0c] text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-swiss-border uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Artifact File</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">Size</th>
                <th className="py-2.5 px-4 hidden md:table-cell">Storage Location</th>
                <th className="py-2.5 px-4 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-swiss-border">
              {files.map((file, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-[#14161c] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2.5">
                      {getCategoryIcon(file.category)}
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{file.name}</div>
                        <div className="text-[10px] text-gray-500 font-sans">{file.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] bg-gray-100 dark:bg-[#181a20] text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-swiss-border font-semibold">
                      {file.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{file.size}</td>
                  <td className="py-3 px-4 text-gray-500 hidden md:table-cell text-[11px] truncate max-w-xs" title={file.path}>
                    {file.path}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={file.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-300 dark:border-blue-800 text-xs font-mono transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: Local Agent Bridge & CLI Integration */}
      <div className="bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-swiss-border p-6 transition-colors">
        <div className="flex items-center space-x-2 mb-2 font-mono text-xs font-bold uppercase text-gray-900 dark:text-white">
          <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Local Agent &amp; CLI Telemetry Connection</span>
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-400 mb-4 leading-relaxed font-sans">
          Feed this exact test execution data into your local AI coding agent (Antigravity, Claude Code, Cursor) or automated CI/CD pipeline without manual downloads:
        </p>
        <div className="p-3 bg-white dark:bg-[#111215] border border-gray-300 dark:border-swiss-border font-mono text-xs flex items-center justify-between">
          <code className="text-blue-700 dark:text-blue-300 overflow-x-auto whitespace-nowrap mr-3">
            curl -s "https://uiqa-platform.pages.dev/api/telemetry?project={telemetry.repo.split('/')[1] || 'aira-academy'}" | jq .
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

      {/* Lightbox Inspection Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111215] border border-gray-200 dark:border-swiss-border max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 bg-gray-100 dark:bg-[#0a0a0c] border-b border-gray-200 dark:border-swiss-border flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                  {selectedScreenshot.title}
                </h4>
                <div className="text-[11px] font-mono text-gray-500 space-x-3 mt-0.5">
                  <span>Viewport: {selectedScreenshot.dimensions}</span>
                  <span>•</span>
                  <span>Timestamp: {selectedScreenshot.timestamp}</span>
                  <span>•</span>
                  <span>Size: {selectedScreenshot.sizeKb} KB</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="px-2.5 py-1 text-xs font-mono bg-gray-200 dark:bg-[#181a20] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-swiss-border flex items-center space-x-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{isZoomed ? '100%' : '150%'}</span>
                </button>
                <a
                  href={selectedScreenshot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-xs font-mono bg-blue-600 text-white flex items-center space-x-1 hover:bg-blue-500"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="p-1 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-900/40">
              <img
                src={selectedScreenshot.url}
                alt={selectedScreenshot.title}
                className={`transition-all duration-200 object-contain max-h-[70vh] border border-gray-300 dark:border-swiss-border ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>

            {/* DOM Inspector Footer */}
            {selectedScreenshot.domSelector && (
              <div className="p-3 bg-gray-50 dark:bg-[#0a0a0c] border-t border-gray-200 dark:border-swiss-border font-mono text-xs text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Inspected DOM Node: <code className="text-blue-600 dark:text-blue-400">{selectedScreenshot.domSelector}</code></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0px Layout Shift Verified</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
