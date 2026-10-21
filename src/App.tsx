import React, { useState, useEffect } from 'react';
import { NavigationTab, UserProgress } from './types';
import { loadUserProgress, saveUserProgress, resetUserProgress, DEFAULT_PROGRESS } from './utils/storage';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { TestView } from './components/TestView';
import { GamesView } from './components/GamesView';
import { CPSProjectView } from './components/CPSProjectView';
import { SummaryView } from './components/SummaryView';
import { AboutView } from './components/AboutView';
import { ShieldCheck, Info, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());
  const [showStorageNotice, setShowStorageNotice] = useState<boolean>(true);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  const handleUpdateProgress = (updated: Partial<UserProgress>) => {
    setProgress((prev) => {
      const nextState = {
        ...prev,
        ...updated
      };
      saveUserProgress(nextState);
      return nextState;
    });
  };

  const handleResetData = () => {
    const fresh = resetUserProgress();
    setProgress(fresh);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        onResetData={handleResetData}
      />

      {/* Local Storage Privacy Banner (Dismissible) */}
      {showStorageNotice && (
        <aside 
          aria-label="ประกาศความเป็นส่วนตัวและการจัดเก็บข้อมูล"
          className="bg-blue-900 text-blue-100 text-xs py-2 px-4 border-b border-blue-800 no-print"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>
                <strong>การจัดเก็บข้อมูลปลอดภัย:</strong> ข้อมูลการเรียนรู้ คะแนน และโครงงานทั้งหมดถูกบันทึกไว้ในเบราว์เซอร์ของอุปกรณ์นี้ (localStorage) โดยไม่ต้องสมัครสมาชิกและไม่ต้องใช้ API ภายนอก
              </span>
            </div>
            <button
              onClick={() => setShowStorageNotice(false)}
              className="text-cyan-300 hover:text-white font-medium cursor-pointer shrink-0 text-[11px] underline"
            >
              เข้าใจแล้ว ปิดการแจ้งเตือน
            </button>
          </div>
        </aside>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView setActiveTab={setActiveTab} progress={progress} />
        )}

        {activeTab === 'pre-test' && (
          <TestView
            type="pre"
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'lessons' && (
          <LessonsView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'games' && (
          <GamesView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'cps-project' && (
          <CPSProjectView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'post-test' && (
          <TestView
            type="post"
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </main>

      {/* Quiet Academic Footer (Anti-slop compliant) */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-slate-200">
              AI READY — รู้ทัน AI ใช้เป็นอย่างสร้างสรรค์
            </p>
            <p className="text-slate-400">
              ผลงานที่ 5: ผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ด้วย AI Vibe Coding · ผลงานรายบุคคลระดับมหาวิทยาลัย
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ข้อมูลผู้จัดทำและแหล่งอ้างอิง
            </button>
            <span>·</span>
            <a
              href="https://bdi.or.th/big-data-101/ai-literacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              BDI AI Literacy
            </a>
            <span>·</span>
            <span>บันทึกข้อมูลในเบราว์เซอร์ (localStorage)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
