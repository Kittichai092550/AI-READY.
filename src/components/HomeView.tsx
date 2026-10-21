import React from 'react';
import { NavigationTab, UserProgress } from '../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Cpu, 
  Lightbulb, 
  FileCheck2, 
  Compass, 
  GraduationCap,
  PlayCircle
} from 'lucide-react';
import { LESSONS } from '../data/learningContent';

interface HomeViewProps {
  setActiveTab: (tab: NavigationTab) => void;
  progress: UserProgress;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, progress }) => {
  const isStarted = progress.preTestCompleted || progress.completedLessons.length > 0;

  const handleStart = () => {
    setActiveTab('pre-test');
  };

  const handleContinue = () => {
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

  const learningSteps = [
    {
      num: '01',
      title: 'แบบทดสอบก่อนเรียน',
      desc: 'วัดระดับความเข้าใจพื้นฐาน 10 ข้อ ก่อนเริ่มเรียน',
      tab: 'pre-test' as NavigationTab,
      done: progress.preTestCompleted
    },
    {
      num: '02',
      title: '5 บทเรียนมัลติมีเดีย',
      desc: 'เรียนรู้พร้อมเสียงบรรยาย ภาพประกอบ และโมเดลจำลอง',
      tab: 'lessons' as NavigationTab,
      done: progress.completedLessons.length === 5
    },
    {
      num: '03',
      title: '3 เกมฝึกคิดโต้ตอบ',
      desc: 'เช็กก่อนเชื่อ, Prompt Builder, และแชร์ได้ไหม?',
      tab: 'games' as NavigationTab,
      done: progress.gamesCompleted.factCheck && progress.gamesCompleted.promptBuilder && progress.gamesCompleted.shareEthics
    },
    {
      num: '04',
      title: 'โครงงานแก้ปัญหา CPS',
      desc: 'แก้ปัญหา 5 ขั้นตอน พร้อมสร้างคู่มือ AI ประจำตัว',
      tab: 'cps-project' as NavigationTab,
      done: Boolean(progress.cpsData.actionAndAcceptance.userFeedback)
    },
    {
      num: '05',
      title: 'แบบทดสอบหลังเรียน',
      desc: 'วัดผลประเมินผลผ่านเกณฑ์มาตรฐาน 7/10',
      tab: 'post-test' as NavigationTab,
      done: progress.postTestCompleted
    },
    {
      num: '06',
      title: 'สรุปผลและพิมพ์รายงาน',
      desc: 'ดูพัฒนาการและพิมพ์รายงานผลงานฉบับสมบูรณ์',
      tab: 'summary' as NavigationTab,
      done: progress.postTestCompleted && progress.preTestCompleted
    }
  ];

  const objectives = [
    'อธิบายความหมายและข้อจำกัดของ AI เช่น AI Hallucination ได้อย่างถูกต้อง',
    'เขียนคำสั่ง (Prompt) โดยระบุงาน บริบท ข้อจำกัด และรูปแบบผลลัพธ์ (RTFC) ได้อย่างมีประสิทธิภาพ',
    'ตรวจสอบคำตอบและแหล่งข้อมูลปฐมภูมิก่อนนำไปใช้งานจริง',
    'เลือกวิธีใช้ AI โดยคำนึงถึงข้อมูลส่วนบุคคล (PDPA), อคติ และความรับผิดชอบทางวิชาการ',
    'สร้างชิ้นงานสื่อสารความรู้เรื่องการใช้ AI อย่างเหมาะสมและปลอดภัยสำหรับนักศึกษา'
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Context Tag - Clean Typography (Anti-Slop No Pills) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 tracking-wide uppercase">
                <span>สื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้</span>
                <span aria-hidden="true">·</span>
                <span>ระดับอุดมศึกษา</span>
                <span aria-hidden="true">·</span>
                <span>AI Vibe Coding</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AI READY — <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600">
                  รู้ทัน AI ใช้เป็นอย่างสร้างสรรค์
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl">
                “เข้าใจ AI ตรวจสอบเป็น สร้างสรรค์อย่างรับผิดชอบ”
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                แพลตฟอร์มการเรียนรู้แบบโครงงาน (Project-based Learning) ผสานกระบวนการคิดแก้ปัญหาเชิงสร้างสรรค์ CPS 5 ขั้นตอน 
                เพื่อเตรียมความพร้อมนักศึกษาสู่การเป็นผู้ใช้ปัญญาประดิษฐ์ที่รู้เท่าทัน ฉลาดเลือก และมีจริยธรรม
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleStart}
                  className="cursor-pointer px-6 py-3 text-sm sm:text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-all flex items-center gap-2 hover:translate-y-[-1px]"
                >
                  <span>เริ่มเรียนตั้งแต่ต้น</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {isStarted && (
                  <button
                    onClick={handleContinue}
                    className="cursor-pointer px-6 py-3 text-sm sm:text-base font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg shadow-xs transition-all flex items-center gap-2"
                  >
                    <span>เรียนต่อจากจุดเดิม</span>
                    <PlayCircle className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('about')}
                  className="cursor-pointer px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  เกี่ยวกับโครงงานและผู้จัดทำ
                </button>
              </div>

              {/* Learning Progress Quick Indicator */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700">ก่อนเรียน:</span>
                  <span>{progress.preTestCompleted ? `${progress.preTestScore}/10 คะแนน` : 'ยังไม่ได้ทำ'}</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700">บทเรียน:</span>
                  <span>{progress.completedLessons.length}/5 บท</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700">หลังเรียน:</span>
                  <span>{progress.postTestCompleted ? `${progress.postTestScore}/10 คะแนน` : 'ยังไม่ได้ทำ'}</span>
                </div>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white">
                <img
                  src="/src/assets/images/hero_student_ai_1792583424677.jpg"
                  alt="นักศึกษามหาวิทยาลัยร่วมเรียนรู้และทำงานร่วมกับ AI Assistant อย่างสร้างสรรค์"
                  className="w-full h-auto object-cover aspect-16/9"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/src/assets/images/mascot_robot_assistant_1792583425107.jpg" 
                      alt="AI Ready Mascot"
                      className="w-10 h-10 rounded-full border border-cyan-400 bg-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-semibold text-cyan-300">หุ่นยนต์ผู้ช่วย AI READY</p>
                      <p className="text-xs text-slate-300">พร้อมร่วมสำรวจทุกบทเรียนและโครงงาน</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-200">5 บท · 3 เกม</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Simulated Scenario Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-blue-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">โจทย์สถานการณ์จำลอง (Simulated Scenario)</span>
                <span className="text-xs text-slate-500 font-normal">
                  (ระบุชัดเจน: เป็นสถานการณ์จำลองเพื่อการเรียนรู้ ไม่อ้างว่าเกิดจากการสำรวจจริง)
                </span>
              </div>
              <blockquote className="text-base sm:text-lg font-medium text-slate-900 border-l-3 border-blue-600 pl-4 py-1 italic bg-blue-50/50 rounded-r-md">
                “นักศึกษาใช้ AI ช่วยทำรายงานและสร้างสื่อออนไลน์ แต่พบข้อมูลที่ตรวจสอบไม่ได้ ภาพชวนเข้าใจผิด 
                และการใส่ข้อมูลส่วนตัวลงในเครื่องมือ AI เราจะออกแบบแนวทางใช้ AI ในการเรียนอย่างสร้างสรรค์และรับผิดชอบได้อย่างไร?”
              </blockquote>
              <p className="text-sm text-slate-600 leading-relaxed">
                สถานการณ์นี้เป็นแกนกลางที่ผู้เรียนจะใช้เป็นฐานในการเรียนรู้ทั้ง 5 บทเรียน ทำกิจกรรมเกมทดลอง และนำไปสู่การทำโครงงาน 
                Creative Problem Solving (CPS) 5 ขั้นตอนเพื่อผลิตคู่มือแนวปฏิบัติจริง
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Learning Objectives</p>
              <h2 className="text-2xl font-bold text-slate-900">วัตถุประสงค์การเรียนรู้</h2>
            </div>
            <p className="text-xs text-slate-500">เมื่อเรียนจบตามกระบวนการ ผู้เรียนสามารถปฏิบัติได้ดังนี้:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectives.map((obj, index) => (
              <div 
                key={index}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3.5 hover:border-blue-300 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{obj}</p>
              </div>
            ))}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <p className="text-xs text-blue-200 uppercase font-semibold">เกณฑ์ประเมินการผ่าน</p>
                <p className="text-lg font-bold mt-1">เกณฑ์หลังเรียน 7/10 คะแนน</p>
                <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                  ผู้เรียนสามารถย้อนกลับมาทบทวนบทเรียนและทำกิจกรรมซ้ำได้ตลอดเวลาเพื่อพัฒนาตนเอง
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('pre-test')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white cursor-pointer"
              >
                <span>เริ่มทำแบบทดสอบก่อนเรียน</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Workflow (ลำดับขั้นตอนการเรียน) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Learning Pathway</p>
              <h2 className="text-2xl font-bold text-slate-900">ลำดับขั้นตอนการเรียนรู้</h2>
            </div>
            <p className="text-xs text-slate-500">ลำดับการเรียนที่แนะนำ: ก่อนเรียน → บทเรียน → โครงงาน → หลังเรียน → สรุปผล</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningSteps.map((step) => (
              <div
                key={step.num}
                onClick={() => setActiveTab(step.tab)}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                      ขั้นตอนที่ {step.num}
                    </span>
                    {step.done ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>เสร็จแล้ว</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">ยังไม่เสร็จ</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-medium">
                  <span>เข้าสู่หน้านี้</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Lessons Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Curriculum Outline</p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">ภาพรวม 5 บทเรียน (บทละ 3–5 นาที)</h2>
            </div>
            <button
              onClick={() => setActiveTab('lessons')}
              className="text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>เปิดดูเนื้อหาทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LESSONS.map((lesson) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveTab('lessons')}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition-colors cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>บทที่ {lesson.id}</span>
                    <span>ประมาณ {lesson.estimatedMinutes} นาที</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {lesson.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {lesson.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className={isCompleted ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                      {isCompleted ? '✓ เรียนจบแล้ว' : 'ยังไม่ได้เรียน'}
                    </span>
                    <span className="text-blue-700 font-medium hover:underline">อ่านบทเรียน</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verification & Academic Integrity Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="space-y-4">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">แก่นสาระสำคัญ</span>
            <h2 className="text-2xl font-bold text-slate-900">เช็กก่อนเชื่อ & ป้องกัน AI Hallucination</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              เครื่องมือ Generative AI สร้างข้อความตามความน่าจะเป็นทางสถิติ จึงมีความเสี่ยงที่จะแต่งข้อมูล เอกสารอ้างอิง และตัวเลขสถิติที่ไม่มีอยู่จริงขึ้นมา 
              การศึกษาในระดับมหาวิทยาลัยจึงจำเป็นต้องมีทักษะการตรวจสอบความถูกต้อง (Verification Checklist) ยืนยันกับแหล่งข้อมูลปฐมภูมิเสมอ
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ตรวจสอบชื่อผู้แต่ง วารสาร และเลข DOI ในฐานข้อมูลจริง</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ระวังการตัดสินภาพ AI ด้วยสายตาเพียงอย่างเดียว ต้องสืบค้นที่มาและภาพย้อนหลัง</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>เปิดเผยการใช้งาน AI ในรายงาน (AI Disclosure) อย่างโปร่งใส</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
            <img 
              src="/src/assets/images/learning_verification_concept_1792583426020.jpg" 
              alt="แผนผังขั้นตอนการตรวจสอบข้อมูลจาก AI อย่างรอบคอบ"
              className="w-full h-auto object-cover aspect-4/3"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
