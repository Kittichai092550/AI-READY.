import React, { useState } from 'react';
import { NavigationTab, UserProgress } from '../types';
import { Menu, X, RotateCcw, BookOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  progress: UserProgress;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onResetData
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Determine primary action button label
  const isStarted = progress.preTestCompleted || progress.completedLessons.length > 0;
  const primaryActionText = isStarted ? 'เรียนต่อ' : 'เริ่มเรียน';

  const handlePrimaryAction = () => {
    if (!progress.preTestCompleted) {
      setActiveTab('pre-test');
    } else if (progress.completedLessons.length < 5) {
      setActiveTab('lessons');
    } else if (!progress.postTestCompleted) {
      setActiveTab('post-test');
    } else {
      setActiveTab('summary');
    }
  };

  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'หน้าแรก' },
    { id: 'pre-test', label: 'ก่อนเรียน' },
    { id: 'lessons', label: 'บทเรียน' },
    { id: 'games', label: 'เกมฝึกคิด' },
    { id: 'cps-project', label: 'โครงงาน CPS' },
    { id: 'post-test', label: 'หลังเรียน' },
    { id: 'summary', label: 'สรุปผล' },
    { id: 'about', label: 'ผู้จัดทำ' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 text-lg">AI READY</span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + reset data trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowResetConfirm(true)}
              title="ล้างข้อมูลการเรียนรู้"
              aria-label="ล้างข้อมูลการเรียนรู้"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>รีเซ็ต</span>
            </button>

            <button
              onClick={handlePrimaryAction}
              className="cursor-pointer px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>{primaryActionText}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="เปิดเมนูนำทาง"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
            <div className="text-xs text-slate-500 mb-2 px-3">เมนูการเรียนรู้</div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-3">
              <span className="text-xs text-slate-500">บันทึกในเบราว์เซอร์นี้</span>
              <button
                onClick={() => {
                  setShowResetConfirm(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>ล้างข้อมูลทั้งหมด</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Confirmation Modal for Resetting User Data */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">ยืนยันการล้างข้อมูลทั้งหมด?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              การดำเนินการนี้จะลบผลคะแนนแบบทดสอบ ความก้าวหน้าบทเรียน กิจกรรมเกม และข้อมูลโครงงาน CPS ทั้งหมดในเครื่องนี้ ข้อมูลที่ลบแล้วจะไม่สามารถกู้คืนได้
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
              >
                ล้างข้อมูลและเริ่มใหม่
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
