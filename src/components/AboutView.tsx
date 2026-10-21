import React, { useState } from 'react';
import { UserProgress, AuthorData, DevProcessData } from '../types';
import { 
  User, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  Code, 
  FileCheck,
  Shield,
  GraduationCap
} from 'lucide-react';

interface AboutViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ progress, onUpdateProgress }) => {
  const [author, setAuthor] = useState<AuthorData>(progress.authorData);
  const [devProcess, setDevProcess] = useState<DevProcessData>(progress.devProcessData);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleAuthorChange = (field: keyof AuthorData, value: string) => {
    const updated = { ...author, [field]: value };
    setAuthor(updated);
    onUpdateProgress({ authorData: updated });
    triggerSaved();
  };

  const handleDevProcessChange = (field: keyof DevProcessData, value: string) => {
    const updated = { ...devProcess, [field]: value };
    setDevProcess(updated);
    onUpdateProgress({ devProcessData: updated });
    triggerSaved();
  };

  const triggerSaved = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <span>ผลงานรายบุคคลระดับมหาวิทยาลัย</span>
              <span>·</span>
              <span>AI Vibe Coding</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              ข้อมูลโครงงานและบันทึกกระบวนการพัฒนาของผู้จัดทำ
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ด้วย AI Vibe Coding (ผลงานที่ 5)
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>บันทึกแล้ว</span>
              </span>
            )}
          </div>
        </div>

        {/* 1. Student / Course Information (Editable Fields) */}
        <div className="mt-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-blue-700" />
            <span>1. ข้อมูลนักศึกษาและรายวิชา (แก้ไขและบันทึกจริง):</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                ชื่อ–นามสกุล:
              </label>
              <input
                type="text"
                value={author.studentName}
                onChange={(e) => handleAuthorChange('studentName', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                รหัสนักศึกษา:
              </label>
              <input
                type="text"
                value={author.studentId}
                onChange={(e) => handleAuthorChange('studentId', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                สาขาวิชา / คณะ / ชั้นปี:
              </label>
              <input
                type="text"
                value={author.facultyMajorYear}
                onChange={(e) => handleAuthorChange('facultyMajorYear', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                รายวิชา:
              </label>
              <input
                type="text"
                value={author.courseTitle}
                onChange={(e) => handleAuthorChange('courseTitle', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                ชื่ออาจารย์ผู้สอน:
              </label>
              <input
                type="text"
                value={author.instructorName}
                onChange={(e) => handleAuthorChange('instructorName', e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Author's Development Process Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-700" />
            <span>2. บันทึกกระบวนการพัฒนาของผู้จัดทำ (Author Development Process Log)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            *บันทึกข้อมูลตามกระบวนการจริงของผู้พัฒนา ไม่มีการสร้างประวัติการทำงานหรือผลทดสอบสมมติ
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              (1) ปัญหาและเป้าหมาย (Problems & Goals):
            </label>
            <textarea
              rows={3}
              value={devProcess.problemAndGoals}
              onChange={(e) => handleDevProcessChange('problemAndGoals', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              (2) แนวคิดที่พิจารณาในการพัฒนาสื่อ (Considered Approaches):
            </label>
            <textarea
              rows={3}
              value={devProcess.consideredApproaches}
              onChange={(e) => handleDevProcessChange('consideredApproaches', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              (3) เหตุผลในการเลือกเทคโนโลยีและการออกแบบ (Selection Rationale):
            </label>
            <textarea
              rows={3}
              value={devProcess.selectionRationale}
              onChange={(e) => handleDevProcessChange('selectionRationale', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              (4) เครื่องมือและ Prompt ที่ใช้ในการพัฒนา (Tools & Prompts Used):
            </label>
            <textarea
              rows={3}
              value={devProcess.toolsAndPromptsUsed}
              onChange={(e) => handleDevProcessChange('toolsAndPromptsUsed', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              (5) การตรวจสอบและแก้ไขด้วยตนเอง (Manual Edits & Refinements):
            </label>
            <textarea
              rows={3}
              value={devProcess.manualRefinements}
              onChange={(e) => handleDevProcessChange('manualRefinements', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              (6) ผลการทดสอบจริงกับระบบ (Actual Testing Results):
            </label>
            <textarea
              rows={3}
              value={devProcess.actualTestingResults}
              onChange={(e) => handleDevProcessChange('actualTestingResults', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              (7) ข้อจำกัดและแนวทางต่อยอด (Limitations & Future Work):
            </label>
            <textarea
              rows={3}
              value={devProcess.limitationsAndFutureWork}
              onChange={(e) => handleDevProcessChange('limitationsAndFutureWork', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. References & AI Literacy Standards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-700" />
            <span>3. แหล่งข้อมูลอ้างอิงทางวิชาการ (Academic References)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            อ้างอิงจากแหล่งข้อมูลปฐมภูมิและมาตรฐานสากลด้าน AI Literacy
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          {/* Primary Reference: BDI */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 text-sm">
                1. สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน) - BDI
              </span>
              <a
                href="https://bdi.or.th/big-data-101/ai-literacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
              >
                <span>เปิดลิงก์บทความต้นฉบับ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="leading-relaxed text-slate-600">
              <strong>บทความ:</strong> “ความฉลาดรู้ด้านปัญญาประดิษฐ์ (AI Literacy)” เผยแพร่ในคอลัมน์ Big Data 101 โดยสถาบันข้อมูลขนาดใหญ่ (BDI)
            </p>
            <p className="text-xs text-slate-500 leading-relaxed bg-white p-2.5 rounded border border-blue-100">
              <strong>สรุปสาระสำคัญ:</strong> AI Literacy คือความสามารถในการเข้าใจ การประยุกต์ใช้ การประเมิน และการมีจริยธรรมในการมีปฏิสัมพันธ์กับปัญญาประดิษฐ์ ซึ่งไม่ใช่แค่การเขียนโปรแกรมเป็น แต่คือการเป็นพลเมืองดิจิทัลที่รู้เท่าทันขีดจำกัด การทำงานร่วมกันระหว่างมนุษย์และ AI และการปกป้องข้อมูลส่วนบุคคล
            </p>
          </div>

          {/* Secondary Reference: UNESCO */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">
                2. UNESCO Guidance for Generative AI in Education and Research (2023)
              </span>
              <a
                href="https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
              >
                <span>เปิดเว็บไซต์ UNESCO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>สรุปสาระสำคัญ:</strong> เน้นย้ำหลักการ Human-Centred Approach โดยให้มนุษย์เป็นศูนย์กลางในการควบคุม การปกป้องข้อมูลความเป็นส่วนตัว ความโปร่งใสในการเปิดเผยการใช้ AI (Disclosure) และการคุ้มครองทรัพย์สินทางปัญญา
            </p>
          </div>

          {/* Secondary Reference: ETDA */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">
                3. สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA) - AI Governance Guideline
              </span>
              <a
                href="https://www.etda.or.th/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
              >
                <span>เปิดเว็บไซต์ ETDA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>สรุปสาระสำคัญ:</strong> แนวทางการกำกับดูแลปัญญาประดิษฐ์อย่างมีธรรมาภิบาล ความโปร่งใส ตรวจสอบได้ (Accountability) และความเป็นธรรม ปราศจากอคติ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
