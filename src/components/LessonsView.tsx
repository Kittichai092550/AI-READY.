import React, { useState, useEffect } from 'react';
import { Lesson, UserProgress, NavigationTab } from '../types';
import { LESSONS } from '../data/learningContent';
import { AIWorkflowAnimation } from './AIWorkflowAnimation';
import { 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  HelpCircle, 
  Sparkles,
  Info,
  Video,
  AlertTriangle
} from 'lucide-react';

interface LessonsViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  
  // Quick check state per lesson
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);

  // Video embed management
  const [showVideoInput, setShowVideoInput] = useState<boolean>(false);
  const [tempVideoUrl, setTempVideoUrl] = useState<string>(progress.customVideoUrl || '');

  const currentLesson: Lesson = LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];
  const isCompleted = progress.completedLessons.includes(currentLesson.id);

  // Reset check answers when changing lessons
  useEffect(() => {
    setSelectedAnswer(null);
    setHasCheckedAnswer(false);
    stopSpeech();
  }, [selectedLessonId]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Web Speech API Thai Text-To-Speech implementation
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    if (!('speechSynthesis' in window)) {
      setSpeechNotice('เบราว์เซอร์หรืออุปกรณ์ของคุณยังไม่รองรับระบบสังเคราะห์เสียงพูด แต่คุณสามารถอ่านเนื้อหาทั้งหมดได้ตามปกติครับ');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentLesson.audioScript);
    utterance.lang = 'th-TH';
    utterance.rate = 0.95; // slightly slower for educational clarity

    // Look for Thai voice
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.includes('th') || v.lang.includes('TH'));
    if (thaiVoice) {
      utterance.voice = thaiVoice;
    } else {
      // If no explicit Thai voice installed
      setSpeechNotice('อุปกรณ์นี้ไม่มีชุดเสียงภาษาไทยติดตั้งไว้ แต่ระบบจะพยายามอ่านผ่านเสียงเริ่มต้น หรือคุณสามารถอ่านเนื้อหาทางสายตาได้ตามปกติครับ');
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
      setSpeechNotice('ขออภัย ระบบเสียงของเบราว์เซอร์ไม่สามารถเล่นได้ในขณะนี้ แต่สามารถอ่านเนื้อหาทั้งหมดได้ตามปกติครับ');
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setSpeechNotice('ระบบเสียงไม่พร้อมทำงานในเบราว์เซอร์นี้ กรุณาอ่านเนื้อหาจากหน้าจอครับ');
      setIsSpeaking(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleMarkCompleted = () => {
    const nextCompleted = Array.from(new Set([...progress.completedLessons, currentLesson.id]));
    onUpdateProgress({ completedLessons: nextCompleted });

    if (currentLesson.id < 5) {
      setSelectedLessonId(currentLesson.id + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveVideoUrl = () => {
    onUpdateProgress({ customVideoUrl: tempVideoUrl.trim() });
    setShowVideoInput(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Lesson Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">บทเรียนหลัก 5 บท</span>
            <h2 className="text-xl font-bold text-slate-900">หลักสูตร AI READY (บทละ 3–5 นาที)</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>ความก้าวหน้าบทเรียน:</span>
            <span className="font-semibold text-slate-900">{progress.completedLessons.length} จาก 5 บท</span>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                style={{ width: `${(progress.completedLessons.length / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {LESSONS.map((l) => {
            const isCurrent = l.id === selectedLessonId;
            const isDone = progress.completedLessons.includes(l.id);
            return (
              <button
                key={l.id}
                onClick={() => setSelectedLessonId(l.id)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-50/80 border-blue-600 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-slate-400">บทที่ {l.id}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-xs font-bold truncate">{l.shortTitle}</p>
                <span className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{l.estimatedMinutes} นาที</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Body */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span>บทเรียนที่ {currentLesson.id}</span>
                <span>·</span>
                <span>เวลาประมาณ {currentLesson.estimatedMinutes} นาที</span>
                {isCompleted && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-300 font-bold">✓ เรียนจบแล้ว</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {currentLesson.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentLesson.description}
              </p>
              <div className="p-3 bg-white/10 rounded-lg text-xs text-cyan-100 flex items-start gap-2 max-w-2xl">
                <Info className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <span><strong>วัตถุประสงค์บทเรียน:</strong> {currentLesson.objective}</span>
              </div>
            </div>

            {/* Multimedia Control Block (Thai TTS & Video toggle) */}
            <div className="flex flex-col gap-2 shrink-0">
              {/* Thai Audio Reader Button */}
              <button
                onClick={handleToggleSpeech}
                className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs ${
                  isSpeaking
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
                aria-label={isSpeaking ? 'หยุดอ่านเสียง' : 'ฟังเสียงบรรยายภาษาไทย'}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>หยุดอ่านเสียง</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>ฟังเสียงบรรยายสรุป (ไทย)</span>
                  </>
                )}
              </button>

              {/* Video URL Toggle */}
              <button
                onClick={() => setShowVideoInput(!showVideoInput)}
                className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{progress.customVideoUrl ? 'จัดการวิดีโอบทเรียน' : 'เพิ่มลิงก์วิดีโอ (ถ้ามี)'}</span>
              </button>
            </div>
          </div>

          {/* Polite Speech Notice fallback if any */}
          {speechNotice && (
            <div className="mt-4 p-3 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-between">
              <span>{speechNotice}</span>
              <button 
                onClick={() => setSpeechNotice(null)} 
                className="text-amber-200 hover:text-white text-xs underline ml-2 cursor-pointer"
              >
                รับทราบ
              </button>
            </div>
          )}
        </div>

        {/* Custom Video Embed Section (Only shown if a valid video URL is configured) */}
        {progress.customVideoUrl && (
          <div className="p-6 bg-slate-950 border-b border-slate-800">
            <div className="max-w-4xl mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span>วิดีโอบทเรียนประกอบการเรียนรู้</span>
                </span>
                <button
                  onClick={() => onUpdateProgress({ customVideoUrl: '' })}
                  className="text-xs text-red-400 hover:underline cursor-pointer"
                >
                  นำวิดีโอออก
                </button>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
                {progress.customVideoUrl.includes('youtube.com') || progress.customVideoUrl.includes('youtu.be') ? (
                  <iframe
                    src={progress.customVideoUrl.replace('watch?v=', 'embed/')}
                    title="Video Lesson"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video 
                    src={progress.customVideoUrl} 
                    controls 
                    className="w-full h-full"
                  >
                    เบราว์เซอร์ไม่รองรับการเล่นไฟล์วิดีโอนี้
                  </video>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video input modal/collapse */}
        {showVideoInput && (
          <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              ใส่ URL วิดีโอบทเรียน (YouTube หรือไฟล์ .mp4):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempVideoUrl}
                onChange={(e) => setTempVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/... หรือ URL วิดีโอ"
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSaveVideoUrl}
                className="px-4 py-2 bg-blue-700 text-white text-xs font-semibold rounded-lg hover:bg-blue-800 cursor-pointer"
              >
                บันทึก
              </button>
              <button
                onClick={() => setShowVideoInput(false)}
                className="px-3 py-2 bg-slate-200 text-slate-700 text-xs rounded-lg hover:bg-slate-300 cursor-pointer"
              >
                ยกเลิก
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              *หากไม่มีไฟล์วิดีโอ ระบบจะใช้โมเดลแอนิเมชันขั้นตอนการทำงานและภาพประกอบคุณภาพสูงที่สร้างไว้จริงโดยอัตโนมัติ
            </p>
          </div>
        )}

        {/* Lesson Content Sections */}
        <div className="p-6 sm:p-8 space-y-8">
          {currentLesson.sections.map((section) => (
            <div key={section.id} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                {section.title}
              </h3>
              
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>

              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    ประเด็นสำคัญที่ต้องจดจำ:
                  </span>
                  <ul className="space-y-1.5">
                    {section.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="text-blue-600 font-bold shrink-0">·</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Example Comparison Box if present */}
              {(section.exampleBad || section.exampleGood) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {section.exampleBad && (
                    <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
                        <AlertTriangle className="w-4 h-4" />
                        <span>ตัวอย่างที่ไม่ควรทำ / จุดบกพร่อง</span>
                      </div>
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-mono bg-white p-2.5 rounded border border-red-100">
                        {section.exampleBad}
                      </p>
                    </div>
                  )}

                  {section.exampleGood && (
                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ตัวอย่างที่ถูกต้อง / แนวทางแนะนำ</span>
                      </div>
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-mono bg-white p-2.5 rounded border border-emerald-100">
                        {section.exampleGood}
                      </p>
                    </div>
                  )}

                  {section.exampleExplanation && (
                    <div className="md:col-span-2 text-xs text-slate-600 bg-slate-100/80 p-3 rounded-lg border border-slate-200">
                      <strong>คำอธิบายเหตุผล:</strong> {section.exampleExplanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Interactive Multimedia Stage: Workflow Animation (Showcased in Lesson 1 & Lesson 5) */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                สื่อมัลติมีเดียแบบโต้ตอบ (Interactive Workflow Simulator)
              </span>
            </div>
            <AIWorkflowAnimation />
          </div>

          {/* Quick Check Mini Quiz */}
          <div className="bg-blue-50/60 rounded-2xl border border-blue-200 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-700" />
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                กิจกรรมตรวจเช็กความเข้าใจท้ายบท (Quick Check)
              </h4>
            </div>

            <p className="text-sm font-medium text-slate-800">
              {currentLesson.quickCheck.question}
            </p>

            <div className="space-y-2">
              {currentLesson.quickCheck.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                let optionStyle = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';

                if (hasCheckedAnswer) {
                  if (idx === currentLesson.quickCheck.correctIndex) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                  } else if (isSelected) {
                    optionStyle = 'bg-red-50 border-red-400 text-red-900 line-through';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-blue-100/70 border-blue-600 text-blue-900 font-semibold';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasCheckedAnswer}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {hasCheckedAnswer && idx === currentLesson.quickCheck.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {!hasCheckedAnswer ? (
              <button
                disabled={selectedAnswer === null}
                onClick={() => setHasCheckedAnswer(true)}
                className="px-5 py-2 bg-blue-700 text-white rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 cursor-pointer"
              >
                ตรวจคำตอบ
              </button>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-blue-700">เฉลยพร้อมเหตุผล:</span>
                <p className="leading-relaxed">{currentLesson.quickCheck.explanation}</p>
              </div>
            )}
          </div>

          {/* End-of-lesson Takeaway Summary */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              สรุปประเด็นหลักท้ายบท (Key Takeaways)
            </span>
            <ul className="space-y-2">
              {currentLesson.summaryTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lesson Navigation & Completion Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <button
              disabled={selectedLessonId === 1}
              onClick={() => {
                setSelectedLessonId(selectedLessonId - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>บทก่อนหน้า</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleMarkCompleted}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>{isCompleted ? 'เรียนจบแล้ว (ไปต่อ)' : 'บันทึกว่าเรียนจบแล้ว'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {currentLesson.id === 5 && (
                <button
                  onClick={() => setActiveTab('games')}
                  className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>ไปเล่นเกมฝึกคิด</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
