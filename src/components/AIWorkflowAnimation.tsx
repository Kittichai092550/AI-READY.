import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, CheckCircle2, Terminal, Cpu, Search, Sparkles } from 'lucide-react';

interface StageInfo {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  humanRole: string;
  aiRole: string;
  checkpoint: string;
  icon: React.ReactNode;
}

export const AIWorkflowAnimation: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const stages: StageInfo[] = [
    {
      id: 0,
      title: 'ขั้นที่ 1: คำสั่ง (Prompt)',
      subtitle: 'มนุษย์กำหนดวัตถุประสงค์ด้วย RTFC',
      description: 'ผู้เรียนระบุเป้าหมายอย่างชัดเจน: Role (บทบาท), Task (งานที่ต้องการ), Context (บริบทและกลุ่มเป้าหมาย), Constraints (ข้อจำกัด), และ Format (รูปแบบผลลัพธ์) เพื่อป้องกันคำตอบที่กว้างเกินไป',
      humanRole: 'คิดวิเคราะห์โจทย์ ระบุขอบเขต และกำหนดเงื่อนไข',
      aiRole: 'รับชุดคำสั่งแปลงเป็นเวกเตอร์ข้อมูล (Tokenization)',
      checkpoint: 'เช็กว่ามีบริบท ข้อจำกัด และรูปแบบผลลัพธ์ครบหรือไม่',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      id: 1,
      title: 'ขั้นที่ 2: AI ประมวลผลและสร้างคำตอบ',
      subtitle: 'การคำนวณความน่าจะเป็นของคำ (Next-Token Prediction)',
      description: 'โมเดลภาษาขนาดใหญ่ (LLM) คำนวณความสัมพันธ์ทางสถิติและสร้างคำตอบออกมาทีละคำ โมเดลไม่ได้เข้าใจความหมายจริง และพร้อมแต่งคำตอบขึ้นมาหากไม่มีข้อมูลที่แน่ชัด (AI Hallucination)',
      humanRole: 'รอรับผลลัพธ์และสังเกตลักษณะคำตอบ',
      aiRole: 'สังเคราะห์ข้อความ/ภาพตามความน่าจะเป็นทางสถิติ',
      checkpoint: 'ระลึกไว้เสมอว่าข้อมูลที่ได้อาจมีข้อผิดพลาดแฝงอยู่',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'ขั้นที่ 3: ผู้ใช้ตรวจสอบและกลั่นกรอง (Human Verification)',
      subtitle: 'การตรวจจับภาพหลอนและอคติ (Human-in-the-Loop)',
      description: 'ผู้เรียนแยกแยะข้อเท็จจริง ข้อคิดเห็น และข้อกล่าวอ้าง ตรวจสอบผู้แต่ง วันที่ เอกสารอ้างอิง และค้นหาเทียบเคียงกับฐานข้อมูลวิชาการปฐมภูมิจริง รวมถึงสังเกตอคติทางวัฒนธรรมและเพศ',
      humanRole: 'ใช้ทักษะการคิดเชิงวิพากษ์ ตรวจเอกสารอ้างอิงจริง',
      aiRole: 'ไม่มีบทบาทในขั้นนี้ (ต้องอาศัยมนุษย์ตรวจสอบ)',
      checkpoint: 'ตรวจสอบกับแหล่งข้อมูลปฐมภูมิจริงอย่างน้อย 2 แหล่ง',
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'ขั้นที่ 4: ปรับปรุงและนำไปใช้อย่างรับผิดชอบ',
      subtitle: 'การขัดเกลาด้วยตนเองและความโปร่งใสทางวิชาการ',
      description: 'ผู้เรียนเรียบเรียงใหม่ด้วยสำนวนของตนเอง บันทึกประวัติการใช้ AI (AI Disclosure Log) และนำไปใช้โดยเคารพสิทธิ ลิขสิทธิ์ และไม่ละเมิดความเป็นส่วนตัวของผู้อื่น',
      humanRole: 'ตัดสินใจขั้นสุดท้าย เขียนเรียบเรียง และรับผิดชอบผลงาน',
      aiRole: 'อาจช่วยตรวจทานไวยากรณ์และการสะกดคำ',
      checkpoint: 'ระบุในรายงานอย่างโปร่งใสว่าใช้ AI ช่วยในส่วนใดบ้าง',
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  // Auto playback effect
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStage((prev) => (prev + 1) % stages.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, stages.length]);

  const current = stages[activeStage];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-lg border border-slate-800 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>ANIMATED WORKFLOW</span>
            <span>·</span>
            <span>วงจรการทำงานร่วมกันระหว่างมนุษย์และ AI</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            คำสั่ง → AI สร้างคำตอบ → ผู้ใช้ตรวจสอบ → ปรับปรุงและนำไปใช้
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>หยุดชั่วคราว</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>เล่นอัตโนมัติ</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStage((prev) => (prev + 1) % stages.length);
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            ก้าวหน้าไป 1 ขั้น
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStage(0);
            }}
            title="รีเซ็ตกลับไปขั้นแรก"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stage Nodes Bar (Horizontal Timeline on Tablet/Desktop, Grid on Mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {stages.map((stage, idx) => {
          const isSelected = activeStage === idx;
          return (
            <button
              key={stage.id}
              onClick={() => {
                setIsPlaying(false);
                setActiveStage(idx);
              }}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-800 border-cyan-400 shadow-md ring-1 ring-cyan-400/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>
                  {stage.icon}
                </span>
                <span className="text-[10px] font-mono text-slate-400">ขั้นที่ {idx + 1}</span>
              </div>
              <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                {stage.title.split(': ')[1]}
              </p>
              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detail Showcase Card for Current Stage */}
      <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              สถานะปัจจุบัน ({activeStage + 1}/4)
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">{current.title}</h4>
            <p className="text-xs text-slate-400">{current.subtitle}</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 w-fit">
            {current.checkpoint}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {current.description}
        </p>

        {/* Roles Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
            <span className="text-xs font-bold text-cyan-300 block mb-1">บทบาทของผู้เรียน (Human):</span>
            <p className="text-xs text-slate-300 leading-relaxed">{current.humanRole}</p>
          </div>
          <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
            <span className="text-xs font-bold text-indigo-300 block mb-1">บทบาทของ AI (Machine):</span>
            <p className="text-xs text-slate-300 leading-relaxed">{current.aiRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
