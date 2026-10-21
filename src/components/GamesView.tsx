import React, { useState } from 'react';
import { UserProgress, NavigationTab } from '../types';
import { FACT_CHECK_CHALLENGES, SHARE_ETHICS_SCENARIOS } from '../data/gamesData';
import { 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Search, 
  ArrowRight,
  Info
} from 'lucide-react';

interface GamesViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [activeGame, setActiveGame] = useState<'fact' | 'prompt' | 'ethics'>('fact');

  // Game 1 State: Fact Check
  const [factIndex, setFactIndex] = useState<number>(0);
  const [factSelectedOption, setFactSelectedOption] = useState<number | null>(null);

  // Game 2 State: Prompt Builder
  const [roleInput, setRoleInput] = useState<string>('ที่ปรึกษาโครงงานวิทยาศาสตร์ระดับมหาวิทยาลัย');
  const [taskInput, setTaskInput] = useState<string>('ช่วยออกแบบแนวคิดโครงงานลดขยะเศษอาหารในโรงอาหาร');
  const [contextInput, setContextInput] = useState<string>('สำหรับนักศึกษาชั้นปีที่ 2 ทำงานกลุ่ม 4 คน ระยะเวลา 3 สัปดาห์ โดยไม่มีงบประมาณจัดซื้อเซนเซอร์ราคาแพง');
  const [constraintsInput, setConstraintsInput] = useState<string>('ต้องมีความเป็นไปได้จริง ระบุปัญหาและตัวชี้วัดที่เป็นรูปธรรม และไม่ใช้ศัพท์เทคนิคที่เข้าใจยาก');
  const [formatInput, setFormatInput] = useState<string>('นำเสนอเป็นตาราง 3 คอลัมน์ (แนวคิด, วิธีดำเนินการ, และตัวชี้วัดความสำเร็จ)');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Game 3 State: Share / Privacy Dilemma
  const [ethicsIndex, setEthicsIndex] = useState<number>(0);
  const [ethicsSelectedOption, setEthicsSelectedOption] = useState<number | null>(null);

  // Prompt composition
  const assembledPrompt = `สวมบทบาท: ${roleInput}
งานที่ต้องการ: ${taskInput}
บริบทและกลุ่มเป้าหมาย: ${contextInput}
ข้อจำกัดและข้อห้าม: ${constraintsInput}
รูปแบบผลลัพธ์: ${formatInput}`;

  // Transparent checklist calculation (No claiming to be real AI assessment)
  const checklist = {
    hasRole: roleInput.trim().length >= 5,
    hasTask: taskInput.trim().length >= 8,
    hasContext: contextInput.trim().length >= 10,
    hasConstraints: constraintsInput.trim().length >= 10,
    hasFormat: formatInput.trim().length >= 5
  };

  const checklistScore = Object.values(checklist).filter(Boolean).length;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(assembledPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);

    // Mark prompt builder completed
    if (!progress.gamesCompleted.promptBuilder) {
      onUpdateProgress({
        gamesCompleted: {
          ...progress.gamesCompleted,
          promptBuilder: true
        }
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              กิจกรรมเสริมทักษะเชิงปฏิบัติ (Interactive Activities)
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">3 เกมฝึกคิด: รู้ทันและใช้ AI เป็น</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ฝึกฝนผ่านสถานการณ์จำลองด้วยการคลิกเลือกคำตอบ รับฟีดแบ็กพร้อมคำอธิบายทันที เล่นซ้ำได้ไม่จำกัด
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveGame('fact')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeGame === 'fact' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. เช็กก่อนเชื่อ
            </button>
            <button
              onClick={() => setActiveGame('prompt')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeGame === 'prompt' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Prompt Builder
            </button>
            <button
              onClick={() => setActiveGame('ethics')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeGame === 'ethics' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. แชร์ได้ไหม?
            </button>
          </div>
        </div>

        {/* Completion status bar */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className={progress.gamesCompleted.factCheck ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
              {progress.gamesCompleted.factCheck ? '✓ เช็กก่อนเชื่อ สำเร็จ' : '○ เช็กก่อนเชื่อ ยังไม่จบ'}
            </span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className={progress.gamesCompleted.promptBuilder ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
              {progress.gamesCompleted.promptBuilder ? '✓ Prompt Builder สำเร็จ' : '○ Prompt Builder ยังไม่จบ'}
            </span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className={progress.gamesCompleted.shareEthics ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
              {progress.gamesCompleted.shareEthics ? '✓ แชร์ได้ไหม? สำเร็จ' : '○ แชร์ได้ไหม? ยังไม่จบ'}
            </span>
          </div>
        </div>
      </div>

      {/* GAME 1: เช็กก่อนเชื่อ */}
      {activeGame === 'fact' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-700" />
              <h2 className="text-lg font-bold text-slate-900">เกมที่ 1: เช็กก่อนเชื่อ (Fact-Checking Challenge)</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              กรณีที่ {factIndex + 1} จาก {FACT_CHECK_CHALLENGES.length}
            </span>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
            <strong>วิธีเล่น:</strong> อ่านสถานการณ์และคำตอบของ AI ด้านล่าง แล้วคลิกเลือก "ขั้นตอนการตรวจสอบที่เหมาะสมที่สุด" ก่อนจะนำข้อมูลไปใช้
          </div>

          {/* Current Challenge */}
          {(() => {
            const currentChallenge = FACT_CHECK_CHALLENGES[factIndex];
            return (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">{currentChallenge.title}</h3>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">ข้อความจำลองจาก AI:</span>
                  <p className="text-sm text-slate-800 italic leading-relaxed">
                    “{currentChallenge.scenario}”
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    คุณจะตัดสินใจดำเนินการอย่างไร? (คลิกเลือกคำตอบ):
                  </span>
                  {currentChallenge.options.map((opt, oIdx) => {
                    const isSelected = factSelectedOption === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setFactSelectedOption(oIdx);
                          if (opt.isCorrect && !progress.gamesCompleted.factCheck) {
                            onUpdateProgress({
                              gamesCompleted: {
                                ...progress.gamesCompleted,
                                factCheck: true
                              }
                            });
                          }
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                              : 'bg-red-50 border-red-400 text-red-950'
                            : 'bg-white border-slate-200 hover:border-blue-400 text-slate-800'
                        }`}
                      >
                        <span className="font-bold text-slate-400 shrink-0 mt-0.5">({oIdx + 1})</span>
                        <div className="space-y-1">
                          <p>{opt.text}</p>
                          {isSelected && (
                            <div className={`mt-2 p-2.5 rounded-lg text-xs leading-relaxed ${
                              opt.isCorrect ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
                            }`}>
                              <strong>ผลตอบกลับ:</strong> {opt.feedback}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Next / Previous Challenge */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={factIndex === 0}
                    onClick={() => {
                      setFactIndex(factIndex - 1);
                      setFactSelectedOption(null);
                    }}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                  >
                    ปัญหาก่อนหน้า
                  </button>
                  <button
                    disabled={factIndex === FACT_CHECK_CHALLENGES.length - 1}
                    onClick={() => {
                      setFactIndex(factIndex + 1);
                      setFactSelectedOption(null);
                    }}
                    className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    ปัญหานัดถัดไป
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* GAME 2: Prompt Builder */}
      {activeGame === 'prompt' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-700" />
              <h2 className="text-lg font-bold text-slate-900">เกมที่ 2: Prompt Builder (โครงสร้าง RTFC)</h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">ความสมบูรณ์ตามเช็กลิสต์:</span>
              <span className="font-mono font-bold text-indigo-700">{checklistScore}/5 คะแนน</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-900 leading-relaxed">
            <strong>คำแนะนำ:</strong> กรอกรายละเอียดลงในช่องทั้ง 4 ด้าน เพื่อสร้างคำสั่งที่สมบูรณ์ ชัดเจน 
            ระบบใช้เกณฑ์เช็กลิสต์ที่เปิดเผยเพื่อประเมินความครบถ้วนของโครงสร้าง ไม่ได้อ้างว่าเป็นการประเมินจาก AI จริง
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  1. Role (บทบาทที่ต้องการให้ AI สวม):
                </label>
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="เช่น ที่ปรึกษาโครงงานวิทยาศาสตร์..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  2. Task (งานที่ต้องการให้ทำ):
                </label>
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="เช่น ช่วยออกแบบแนวคิดโครงงาน..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  3. Context (บริบทและกลุ่มเป้าหมาย):
                </label>
                <textarea
                  rows={2}
                  value={contextInput}
                  onChange={(e) => setContextInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="เช่น สำหรับนักศึกษาชั้นปีที่ 2 ทำงานกลุ่ม 4 คน..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  4. Constraints (ข้อจำกัดและข้อห้าม):
                </label>
                <textarea
                  rows={2}
                  value={constraintsInput}
                  onChange={(e) => setConstraintsInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="เช่น ห้ามใช้ศัพท์เฉพาะทาง ไม่เกิน 300 คำ..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  5. Format (รูปแบบผลลัพธ์):
                </label>
                <input
                  type="text"
                  value={formatInput}
                  onChange={(e) => setFormatInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="เช่น ตาราง 3 คอลัมน์, Bullet point 5 ข้อ..."
                />
              </div>
            </div>

            {/* Live Assembly & Transparent Checklist */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  ตัวอย่าง Prompt ที่ประกอบเสร็จ (พร้อมคัดลอกไปใช้):
                </span>
                <div className="bg-slate-900 text-cyan-200 p-4 rounded-xl font-mono text-xs whitespace-pre-line leading-relaxed border border-slate-800 max-h-64 overflow-y-auto">
                  {assembledPrompt}
                </div>

                {/* Checklist items */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">
                    เช็กลิสต์ความพร้อมของคำสั่ง (Transparent Rule-based Checklist):
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={checklist.hasRole ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {checklist.hasRole ? '✓' : '○'} ระบุบทบาทชัดเจน (Role)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={checklist.hasTask ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {checklist.hasTask ? '✓' : '○'} ระบุงานที่ต้องการอย่างเจาะจง (Task)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={checklist.hasContext ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {checklist.hasContext ? '✓' : '○'} บอกบริบทและกลุ่มเป้าหมาย (Context)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={checklist.hasConstraints ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {checklist.hasConstraints ? '✓' : '○'} กำหนดข้อจำกัดและเงื่อนไข (Constraints)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={checklist.hasFormat ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {checklist.hasFormat ? '✓' : '○'} กำหนดรูปแบบผลลัพธ์ (Format)
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy prompt button */}
              <button
                onClick={handleCopyPrompt}
                className="w-full py-2.5 px-4 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>คัดลอก Prompt แล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>คัดลอก Prompt ไปใช้งานจริง</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: แชร์ได้ไหม? */}
      {activeGame === 'ethics' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-bold text-slate-900">เกมที่ 3: แชร์ได้ไหม? (Privacy & Ethics Dilemmas)</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              สถานการณ์ที่ {ethicsIndex + 1} จาก {SHARE_ETHICS_SCENARIOS.length}
            </span>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed">
            <strong>วิธีเล่น:</strong> อ่านสถานการณ์จำลองเกี่ยวกับการใช้งานข้อมูลส่วนบุคคลและทรัพย์สินทางปัญญา 
            แล้วคลิกเลือกแนวทางการปฏิบัติที่ปลอดภัยและถูกต้องตามกฎหมาย/จริยธรรม
          </div>

          {(() => {
            const currentScenario = SHARE_ETHICS_SCENARIOS[ethicsIndex];
            return (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">{currentScenario.title}</h3>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">บริบทสถานการณ์:</span>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {currentScenario.context}
                  </p>
                  <p className="text-xs font-semibold text-blue-800 pt-1">
                    คำถาม: {currentScenario.question}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    ตัวเลือกการตัดสินใจ (คลิกเพื่อเลือก):
                  </span>
                  {currentScenario.choices.map((choice, cIdx) => {
                    const isSelected = ethicsSelectedOption === cIdx;
                    return (
                      <button
                        key={cIdx}
                        onClick={() => {
                          setEthicsSelectedOption(cIdx);
                          if (choice.isSafe && !progress.gamesCompleted.shareEthics) {
                            onUpdateProgress({
                              gamesCompleted: {
                                ...progress.gamesCompleted,
                                shareEthics: true
                              }
                            });
                          }
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? choice.isSafe
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                              : 'bg-red-50 border-red-400 text-red-950'
                            : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800'
                        }`}
                      >
                        <span className="font-bold text-slate-400 shrink-0 mt-0.5">({cIdx + 1})</span>
                        <div className="space-y-1">
                          <p>{choice.label}</p>
                          {isSelected && (
                            <div className={`mt-2 p-2.5 rounded-lg text-xs leading-relaxed ${
                              choice.isSafe ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
                            }`}>
                              <strong>เหตุผลประกอบ:</strong> {choice.reason}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={ethicsIndex === 0}
                    onClick={() => {
                      setEthicsIndex(ethicsIndex - 1);
                      setEthicsSelectedOption(null);
                    }}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                  >
                    สถานการณ์ก่อนหน้า
                  </button>
                  <button
                    disabled={ethicsIndex === SHARE_ETHICS_SCENARIOS.length - 1}
                    onClick={() => {
                      setEthicsIndex(ethicsIndex + 1);
                      setEthicsSelectedOption(null);
                    }}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    สถานการณ์ถัดไป
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Footer Navigation to CPS Project */}
      <div className="bg-slate-100 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">พร้อมนำทักษะไปลงมือปฏิบัติจริงหรือยัง?</h4>
          <p className="text-xs text-slate-600 mt-0.5">
            เมื่อทำกิจกรรมครบแล้ว สามารถเริ่มทำโครงงาน CPS 5 ขั้นตอน เพื่อสร้างคู่มือใช้ AI อย่างรับผิดชอบ
          </p>
        </div>
        <button
          onClick={() => setActiveTab('cps-project')}
          className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>ไปที่โครงงาน CPS 5 ขั้นตอน</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
