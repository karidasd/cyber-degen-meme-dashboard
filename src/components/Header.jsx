import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Video, Globe, Zap, Flame } from 'lucide-react';
import { soundFx } from '../utils/audioFx';

export default function Header({ 
  muted, 
  setMuted, 
  lang, 
  setLang, 
  tiktokMode, 
  setTiktokMode,
  onTriggerPump,
  onTriggerDump
}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('el-GR', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = !muted;
    setMuted(next);
    soundFx.setMuted(next);
    if (!next) soundFx.playBlip();
  };

  return (
    <header className="relative z-30 bg-[#080c1d]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-cyan-950/20">
      {/* Brand & Status */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/30 border border-cyan-400/40 box-glow-cyan">
          <span className="text-xl">🤖</span>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-display font-black text-lg md:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              CYBER-DEGEN <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-terminal">3000</span>
            </h1>
            <span className="hidden sm:inline-block text-[10px] font-terminal text-yellow-400/90 bg-yellow-950/50 border border-yellow-500/30 px-2 py-0.5 rounded">
              MEME AI AGENT
            </span>
          </div>
          <p className="text-[11px] font-terminal text-gray-400">
            AUTONOMOUS 3D MARKET ANALYZER & LIVE DEGEN RADAR
          </p>
        </div>
      </div>

      {/* Market Sentiment Badges */}
      <div className="hidden lg:flex items-center space-x-3 font-terminal text-xs">
        <div className="flex items-center space-x-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded text-emerald-400">
          <Flame className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>FEAR & GREED: <strong className="text-emerald-300">82 (GREED)</strong></span>
        </div>
        <div className="flex items-center space-x-1.5 bg-purple-950/40 border border-purple-500/30 px-2.5 py-1 rounded text-purple-300">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>GAS: <strong className="text-white">16 GWEI</strong></span>
        </div>
        <div className="bg-black/40 border border-gray-700/50 px-2.5 py-1 rounded text-gray-300">
          TIME: <strong className="text-cyan-400">{time}</strong>
        </div>
      </div>

      {/* Action Controls & Streamer Tools */}
      <div className="flex items-center space-x-2">
        {/* TikTok Demo Reactions */}
        <div className="flex items-center bg-black/40 border border-gray-800 rounded p-1 space-x-1">
          <button
            onClick={onTriggerPump}
            title="TikTok Pump Reaction"
            className="px-2 py-1 text-xs font-terminal font-bold rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40 border border-emerald-500/30 transition-all flex items-center space-x-1"
          >
            <span>🚀</span>
            <span className="hidden sm:inline">PUMP</span>
          </button>
          <button
            onClick={onTriggerDump}
            title="TikTok Dump/Rug Reaction"
            className="px-2 py-1 text-xs font-terminal font-bold rounded bg-red-500/20 text-red-300 hover:bg-red-500/40 border border-red-500/30 transition-all flex items-center space-x-1"
          >
            <span>🚨</span>
            <span className="hidden sm:inline">RUG</span>
          </button>
        </div>

        {/* Streamer / TikTok Mode */}
        <button
          onClick={() => {
            soundFx.playBlip();
            setTiktokMode(!tiktokMode);
          }}
          className={`px-2.5 py-1.5 rounded font-terminal text-xs border transition-all flex items-center space-x-1.5 ${
            tiktokMode 
              ? 'bg-purple-600/30 border-purple-400 text-purple-300 shadow-lg shadow-purple-600/20' 
              : 'bg-gray-900/60 border-gray-700 text-gray-400 hover:text-white'
          }`}
          title="Toggle TikTok / Streamer Mode"
        >
          <Video className="w-3.5 h-3.5 text-pink-400" />
          <span className="hidden md:inline">TIKTOK MODE</span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={() => {
            soundFx.playBlip();
            setLang(lang === 'el-GR' ? 'en-US' : 'el-GR');
          }}
          className="px-2.5 py-1.5 rounded bg-gray-900/60 border border-gray-700 text-xs font-terminal text-cyan-300 hover:border-cyan-500/40 transition-all flex items-center space-x-1"
          title="Switch Voice & Interface Language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang === 'el-GR' ? '🇬🇷 ΕΛ' : '🇺🇸 EN'}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleToggleSound}
          className={`p-1.5 rounded border transition-all ${
            muted 
              ? 'bg-red-950/40 border-red-800/60 text-red-400' 
              : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400'
          }`}
          title={muted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
