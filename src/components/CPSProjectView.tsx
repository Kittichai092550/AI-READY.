import React, { useState } from 'react';
import { UserProgress, CPSProjectData, NavigationTab } from '../types';
import { 
  FileText, 
  Lightbulb, 
  Target, 
  CheckSquare, 
  Printer, 
  Sparkles, 
  Edit3, 
  Save, 
  Share2, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';

interface CPSProjectViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const CPSProjectView: React.FC<CPSProjectViewProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [cps, setCps] = useState<CPSProjectData>(progress.cpsData);
  const [editingTitles, setEditingTitles] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<boolean>(false);

  const handleFieldChange = (section: keyof CPSProjectData, field: string, value: any) => {
    setCps((prev) => {
      const updatedSection = {
        ...(prev[section] as any),
        [field]: value
      };
      const nextData = {
        ...prev,
        [section]: updatedSection
      };
      // Auto-save to progress
      onUpdateProgress({ cpsData: nextData });
      return nextData;
    });
  };

  const handleStepTitleChange = (stepKey: keyof CPSProjectData['stepTitles'], value: string) => {
    setCps((prev) => {
      const nextData = {
        ...prev,
        stepTitles: {
          ...prev.stepTitles,
          [stepKey]: value
        }
      };
      onUpdateProgress({ cpsData: nextData });
      return nextData;
    });
  };

  const handlePrintPoster = () => {
    window.print();
  };

  // Rubric total score
  const rubricTotal = 
    (cps.selfAssessment.accuracyScore || 0) +
    (cps.selfAssessment.clarityScore || 0) +
    (cps.selfAssessment.creativityScore || 0) +
    (cps.selfAssessment.responsibilityScore || 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <span>Project-based Learning</span>
              <span>·</span>
              <span>Creative Problem Solving (CPS 5 ขั้นตอน)</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              โครงงานรายบุคคล: คู่มือใช้ AI อย่างรับผิดชอบสำหรับนักศึกษา
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              พื้นที่บันทึกการแก้ปัญหาจริง 5 ขั้นตอน ข้อมูลจะถูกบันทึกอัตโนมัติในเบราว์เซอร์ของเครื่องนี้
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditingTitles(!editingTitles)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{editingTitles ? 'เสร็จสิ้นการแก้ชื่อขั้น' : 'ปรับแก้ชื่อขั้นตอน'}</span>
            </button>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((stepNum) => {
            const stepKey = `step${stepNum}` as keyof CPSProjectData['stepTitles'];
            const title = cps.stepTitles[stepKey];
            const isActive = activeStep === stepNum;
            return (
              <button
                key={stepNum}
                onClick={() => setActiveStep(stepNum)}
                className={`p-3 text-left rounded-xl border text-xs transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-600 text-blue-900 font-semibold shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="font-mono text-[11px] text-slate-400">0{stepNum}</span>
                <span className="truncate mt-1">{title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editable Step Titles Panel if triggered */}
      {editingTitles && (
        <div className="bg-amber-50/80 rounded-2xl border border-amber-200 p-5 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Edit3 className="w-4 h-4" />
            <span>ปรับแต่งชื่อขั้นตอนให้สอดคล้องกับหลักสูตรหรือรายวิชาของคุณ:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5].map((s) => {
              const k = `step${s}` as keyof CPSProjectData['stepTitles'];
              return (
                <div key={s}>
                  <label className="text-[11px] font-semibold text-amber-800 block mb-1">
                    ขั้นตอนที่ {s}:
                  </label>
                  <input
                    type="text"
                    value={cps.stepTitles[k]}
                    onChange={(e) => handleStepTitleChange(k, e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: FACT-FINDING */}
      {activeStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-mono text-blue-700">STEP 01</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{cps.stepTitles.step1}</h2>
            <p className="text-xs text-slate-500 mt-1">
              สำรวจและจำแนกข้อมูลจากสถานการณ์จำลอง: อะไรคือข้อเท็จจริงที่ทราบแล้ว อะไรคือข้อสงสัย และต้องการข้อมูลใดเพิ่มเติม
            </p>
          </div>

          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
            <strong>สถานการณ์จำลองตั้งต้น:</strong>
            <p className="leading-relaxed italic">
              {cps.factFinding.scenarioDescription}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                1. สิ่งที่รู้แล้วจากสถานการณ์ (Known Facts):
              </label>
              <textarea
                rows={3}
                value={cps.factFinding.knownFacts}
                onChange={(e) => handleFieldChange('factFinding', 'knownFacts', e.target.value)}
                placeholder="ระบุข้อเท็จจริงที่พบ เช่น นักศึกษาใช้ AI ช่วยทำรายงาน แต่ข้อมูลมีแหล่งอ้างอิงที่ไม่มีอยู่จริง..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                2. สิ่งที่ยังเป็นข้อสงสัยหรือข้อสมมติที่ต้องตรวจสอบ (Unverified Assumptions):
              </label>
              <textarea
                rows={3}
                value={cps.factFinding.unverifiedAssumptions}
                onChange={(e) => handleFieldChange('factFinding', 'unverifiedAssumptions', e.target.value)}
                placeholder="ระบุสิ่งที่ยังไม่แน่ชัด เช่น ภาพที่สร้างจาก AI ส่งผลกระทบต่อลิขสิทธิ์ของผู้อื่นอย่างไร ข้อมูลที่กรอกใน AI จะถูกนำไปใช้ต่อจริงหรือไม่..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                3. แหล่งข้อมูลที่เกี่ยวข้องที่ต้องนำมาอ้างอิง (Required Sources):
              </label>
              <textarea
                rows={2}
                value={cps.factFinding.requiredSources}
                onChange={(e) => handleFieldChange('factFinding', 'requiredSources', e.target.value)}
                placeholder="เช่น บทความ AI Literacy ของ BDI (bdi.or.th), คู่มือ UNESCO Generative AI, ประกาศ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>ไปขั้นที่ 2: ระบุปัญหา</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PROBLEM-FINDING */}
      {activeStep === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-mono text-blue-700">STEP 02</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{cps.stepTitles.step2}</h2>
            <p className="text-xs text-slate-500 mt-1">
              วิเคราะห์สาเหตุที่แท้จริง กำหนดปัญหาหลัก ผู้ได้รับผลกระทบ และตั้งคำถามท้าทายความคิด (How Might We)
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                1. ปัญหาหลักที่ต้องการแก้ไข (Core Problem Statement):
              </label>
              <textarea
                rows={3}
                value={cps.problemFinding.coreProblem}
                onChange={(e) => handleFieldChange('problemFinding', 'coreProblem', e.target.value)}
                placeholder="ระบุปัญหาหลักอย่างกระชับ เช่น นักศึกษาขาดแนวปฏิบัติที่ชัดเจนในการตรวจสอบความถูกต้องของข้อมูลจาก AI และไม่ระวังเรื่องข้อมูลส่วนบุคคล..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                2. ผู้ที่ได้รับผลกระทบจากปัญหานี้ (Affected Stakeholders):
              </label>
              <input
                type="text"
                value={cps.problemFinding.affectedStakeholders}
                onChange={(e) => handleFieldChange('problemFinding', 'affectedStakeholders', e.target.value)}
                placeholder="เช่น นักศึกษาผู้จัดทำรายงาน, อาจารย์ผู้ตรวจ, สถาบันการศึกษา, เจ้าของข้อมูลส่วนบุคคล..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                3. คำถามท้าทายความคิด "เราจะทำอย่างไรให้...?" (How Might We... / HMW):
              </label>
              <textarea
                rows={2}
                value={cps.problemFinding.howMightWe}
                onChange={(e) => handleFieldChange('problemFinding', 'howMightWe', e.target.value)}
                placeholder="เราจะทำอย่างไรให้นักศึกษาสามารถ..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ย้อนกลับขั้นที่ 1
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>ไปขั้นที่ 3: สร้างแนวคิด</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: IDEA-FINDING */}
      {activeStep === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-mono text-blue-700">STEP 03</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{cps.stepTitles.step3}</h2>
            <p className="text-xs text-slate-500 mt-1">
              ระดมสมองเสนอทางเลือกในการแก้ปัญหาอย่างน้อย 3 แนวคิด โดยยังไม่รีบตัดสินหรือปิดกั้นความคิด
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                แนวคิดที่ 1 (Idea 1):
              </label>
              <textarea
                rows={2}
                value={cps.ideaFinding.idea1}
                onChange={(e) => handleFieldChange('ideaFinding', 'idea1', e.target.value)}
                placeholder="เช่น จัดทำโปสเตอร์อินโฟกราฟิก '5 กฎเหล็กใช้ AI อย่างรับผิดชอบ' ติดที่ห้องแล็บและแชร์ในกลุ่มไลน์สาขา..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                แนวคิดที่ 2 (Idea 2):
              </label>
              <textarea
                rows={2}
                value={cps.ideaFinding.idea2}
                onChange={(e) => handleFieldChange('ideaFinding', 'idea2', e.target.value)}
                placeholder="เช่น ออกแบบแบบฟอร์มตรวจสอบความถูกต้อง (Verification Checklist) 1 แผ่น ให้นักศึกษาแนบท้ายรายงานวิชาการ..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                แนวคิดที่ 3 (Idea 3):
              </label>
              <textarea
                rows={2}
                value={cps.ideaFinding.idea3}
                onChange={(e) => handleFieldChange('ideaFinding', 'idea3', e.target.value)}
                placeholder="เช่น สร้างคลิปวิดีโอสั้นจำลองสถานการณ์ 'เมื่อข้อมูลหลุดเพราะ AI' เพื่อสร้างความตระหนักรู้แบบกระตุกความคิด..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                แนวคิดเพิ่มเติมที่ 4 (ถ้ามี):
              </label>
              <input
                type="text"
                value={cps.ideaFinding.idea4 || ''}
                onChange={(e) => handleFieldChange('ideaFinding', 'idea4', e.target.value)}
                placeholder="เช่น การจัดอบรมแบบ Peer-to-Peer Workshop..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveStep(2)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ย้อนกลับขั้นที่ 2
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>ไปขั้นที่ 4: เลือกวิธีแก้ปัญหา</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SOLUTION-FINDING */}
      {activeStep === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-mono text-blue-700">STEP 04</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{cps.stepTitles.step4}</h2>
            <p className="text-xs text-slate-500 mt-1">
              ประเมินเปรียบเทียบแนวคิดตามเกณฑ์ 4 ด้าน: ประโยชน์, ความเป็นไปได้, ความถูกต้อง, และความรับผิดชอบ แล้วเลือกวิธีที่ดีที่สุดพร้อมให้เหตุผล
            </p>
          </div>

          {/* Criteria Evaluation Matrix */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              ตารางวิเคราะห์เปรียบเทียบเกณฑ์ 4 ด้าน (Evaluation Criteria):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="text-xs font-bold text-blue-900 block">
                  1. ด้านประโยชน์ (Usefulness):
                </label>
                <textarea
                  rows={2}
                  value={cps.solutionFinding.criteriaNotes.usefulness}
                  onChange={(e) => {
                    const notes = { ...cps.solutionFinding.criteriaNotes, usefulness: e.target.value };
                    handleFieldChange('solutionFinding', 'criteriaNotes', notes);
                  }}
                  placeholder="ช่วยแก้ไขปัญหาข้อมูลไม่ถูกต้องและการหลุดของข้อมูลได้จริงเพียงใด..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="text-xs font-bold text-indigo-900 block">
                  2. ด้านความเป็นไปได้ (Feasibility):
                </label>
                <textarea
                  rows={2}
                  value={cps.solutionFinding.criteriaNotes.feasibility}
                  onChange={(e) => {
                    const notes = { ...cps.solutionFinding.criteriaNotes, feasibility: e.target.value };
                    handleFieldChange('solutionFinding', 'criteriaNotes', notes);
                  }}
                  placeholder="นักศึกษาสามารถทำได้จริงในเวลาและทรัพยากรที่มีอยู่หรือไม่..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="text-xs font-bold text-cyan-900 block">
                  3. ด้านความถูกต้อง (Accuracy):
                </label>
                <textarea
                  rows={2}
                  value={cps.solutionFinding.criteriaNotes.accuracy}
                  onChange={(e) => {
                    const notes = { ...cps.solutionFinding.criteriaNotes, accuracy: e.target.value };
                    handleFieldChange('solutionFinding', 'criteriaNotes', notes);
                  }}
                  placeholder="มีหลักฐานอ้างอิงและหลักการทางวิชาการรองรับชัดเจนเพียงใด..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="text-xs font-bold text-emerald-900 block">
                  4. ด้านความรับผิดชอบ (Responsibility):
                </label>
                <textarea
                  rows={2}
                  value={cps.solutionFinding.criteriaNotes.responsibility}
                  onChange={(e) => {
                    const notes = { ...cps.solutionFinding.criteriaNotes, responsibility: e.target.value };
                    handleFieldChange('solutionFinding', 'criteriaNotes', notes);
                  }}
                  placeholder="คำนึงถึงจริยธรรม ความเป็นส่วนตัว และไม่สร้างผลกระทบเชิงลบต่อผู้อื่น..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Selected Solution & Rationale */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  แนวคิดที่คัดเลือกเป็นวิธีแก้ปัญหา (Selected Solution):
                </label>
                <input
                  type="text"
                  value={cps.solutionFinding.selectedIdea}
                  onChange={(e) => handleFieldChange('solutionFinding', 'selectedIdea', e.target.value)}
                  placeholder="เช่น สร้างคู่มือการใช้ AI อย่างรับผิดชอบ 5 กฎเหล็กในรูปแบบโปสเตอร์สรุปที่พิมพ์ได้..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  เหตุผลในการตัดสินใจเลือกแนวคิดนี้ (Selection Rationale):
                </label>
                <textarea
                  rows={3}
                  value={cps.solutionFinding.selectionRationale}
                  onChange={(e) => handleFieldChange('solutionFinding', 'selectionRationale', e.target.value)}
                  placeholder="อธิบายเหตุผลว่าทำไมวิธีนี้จึงตอบโจทย์ทั้ง 4 เกณฑ์ได้ดีที่สุด..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveStep(3)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ย้อนกลับขั้นที่ 3
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>ไปขั้นที่ 5: ลงมือทำและสร้างโปสเตอร์</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: ACTION & ACCEPTANCE - POSTER BUILDER & REAL TESTING */}
      {activeStep === 5 && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-mono text-blue-700">STEP 05</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">{cps.stepTitles.step5}</h2>
              <p className="text-xs text-slate-500 mt-1">
                สร้างสื่อคู่มือ/โปสเตอร์สรุปการใช้ AI อย่างรับผิดชอบ พร้อมบันทึกผลการทดลองใช้จริงและการประเมินตนเอง
              </p>
            </div>

            {/* Form to generate Poster */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                1. ข้อมูลในชิ้นงานคู่มือ/โปสเตอร์ (Guide & Poster Generator Form):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    ชื่อชิ้นงาน (Poster Title):
                  </label>
                  <input
                    type="text"
                    value={cps.actionAndAcceptance.posterTitle}
                    onChange={(e) => handleFieldChange('actionAndAcceptance', 'posterTitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    กลุ่มเป้าหมาย (Target Audience):
                  </label>
                  <input
                    type="text"
                    value={cps.actionAndAcceptance.targetAudience}
                    onChange={(e) => handleFieldChange('actionAndAcceptance', 'targetAudience', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* 5 Core Tips */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  ข้อแนะนำ 5 ข้อในการใช้ AI อย่างรับผิดชอบ:
                </span>
                {[1, 2, 3, 4, 5].map((tipNum) => {
                  const tipField = `tip${tipNum}` as keyof typeof cps.actionAndAcceptance;
                  return (
                    <div key={tipNum} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                        {tipNum}
                      </span>
                      <input
                        type="text"
                        value={cps.actionAndAcceptance[tipField] as string}
                        onChange={(e) => handleFieldChange('actionAndAcceptance', tipField, e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  แหล่งข้อมูลอ้างอิงที่ระบุบนโปสเตอร์ (References):
                </label>
                <input
                  type="text"
                  value={cps.actionAndAcceptance.referencesText}
                  onChange={(e) => handleFieldChange('actionAndAcceptance', 'referencesText', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* Theme selector */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-semibold text-slate-700">ชุดสีโปสเตอร์:</span>
                <div className="flex gap-2">
                  {(['navy', 'indigo', 'cyan', 'minimal'] as const).map((thm) => (
                    <button
                      key={thm}
                      onClick={() => handleFieldChange('actionAndAcceptance', 'theme', thm)}
                      className={`px-3 py-1 text-xs rounded-md border capitalize cursor-pointer ${
                        cps.actionAndAcceptance.theme === thm
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {thm}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rendered Live Poster Card (Printable & Exportable) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                ตัวอย่างชิ้นงานโปสเตอร์สำเร็จ (พร้อมพิมพ์หรือบันทึกเป็น PDF):
              </span>
              <button
                onClick={handlePrintPoster}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์โปสเตอร์ / บันทึก PDF</span>
              </button>
            </div>

            {/* Poster Card Container */}
            <div 
              id="printable-poster-area"
              className={`rounded-2xl p-6 sm:p-8 border shadow-md space-y-6 transition-all ${
                cps.actionAndAcceptance.theme === 'navy'
                  ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border-blue-900'
                  : cps.actionAndAcceptance.theme === 'indigo'
                    ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white border-indigo-900'
                    : cps.actionAndAcceptance.theme === 'cyan'
                      ? 'bg-gradient-to-br from-cyan-950 via-blue-900 to-slate-900 text-white border-cyan-800'
                      : 'bg-white text-slate-900 border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b pb-4 border-white/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono opacity-80">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>RESPONSIBLE AI GUIDE · สื่อการเรียนรู้มหาวิทยาลัย</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    {cps.actionAndAcceptance.posterTitle}
                  </h3>
                  <p className="text-xs opacity-80">
                    กลุ่มเป้าหมาย: {cps.actionAndAcceptance.targetAudience}
                  </p>
                </div>
                
                <img 
                  src="/src/assets/images/responsible_ai_poster_art_1792583425777.jpg" 
                  alt="Responsible AI Emblem"
                  className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* 5 Tips List */}
              <div className="space-y-3">
                {[
                  cps.actionAndAcceptance.tip1,
                  cps.actionAndAcceptance.tip2,
                  cps.actionAndAcceptance.tip3,
                  cps.actionAndAcceptance.tip4,
                  cps.actionAndAcceptance.tip5
                ].map((tip, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {tip.replace(/^[0-9]\.\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer of Poster */}
              <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] opacity-75 gap-2">
                <span>อ้างอิง: {cps.actionAndAcceptance.referencesText}</span>
                <span>ผู้จัดทำ: {progress.authorData.studentName} ({progress.authorData.studentId})</span>
              </div>
            </div>
          </div>

          {/* Section: Real Testing & Refinements (NO Auto-Fill!) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                2. บันทึกผลการทดลองใช้จริงและการปรับปรุง (Real Testing & Feedback)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                *ต้องเป็นข้อมูลที่ผู้เรียนนำไปทดลองใช้และรับฟีดแบ็กจริง ห้ามเติมข้อมูลอัตโนมัติ
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ผลการทดลองนำคู่มือ/โปสเตอร์ไปเผยแพร่หรือทดลองใช้ (Actual Testing Context):
                </label>
                <textarea
                  rows={3}
                  value={cps.actionAndAcceptance.userFeedback}
                  onChange={(e) => handleFieldChange('actionAndAcceptance', 'userFeedback', e.target.value)}
                  placeholder="เช่น นำไปส่งให้เพื่อนในกลุ่มวิชาสัมมนาอ่าน 5 คน และสอบถามความเข้าใจ..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ข้อเสนอแนะที่ได้รับจากผู้ทดลองใช้จริง (Real Feedback Received):
                </label>
                <textarea
                  rows={2}
                  value={cps.actionAndAcceptance.revisionNotes}
                  onChange={(e) => handleFieldChange('actionAndAcceptance', 'revisionNotes', e.target.value)}
                  placeholder="เช่น เพื่อนแจ้งว่าข้อความในข้อ 3 ยังยาวไป อยากให้มีตัวอย่างคำค้นหา..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  สิ่งที่ได้ปรับปรุงแก้ไขและสิ่งที่ได้เรียนรู้จากการทำโครงงาน (Learnings & Revisions):
                </label>
                <textarea
                  rows={3}
                  value={cps.actionAndAcceptance.reflectionLearnings}
                  onChange={(e) => handleFieldChange('actionAndAcceptance', 'reflectionLearnings', e.target.value)}
                  placeholder="เช่น ปรับข้อความให้กระชับขึ้น ได้เรียนรู้ว่าการสื่อสารเรื่องจริยธรรม AI ต้องใช้ตัวอย่างที่เห็นภาพชัดเจน..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Self-Assessment Rubric (แบบประเมินตนเอง 4 ด้าน ด้านละ 5 คะแนน) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase">
                  <CheckSquare className="w-4 h-4" />
                  <span>แบบประเมินตนเองตามเกณฑ์รูบริก (Self-Assessment Rubric)</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  ประเมินคุณภาพผลงานตนเอง 4 ด้าน (รวม 20 คะแนน)
                </h3>
                <p className="text-xs text-slate-500">
                  *ระบุชัดเจน: คะแนนส่วนนี้เป็น "คะแนนประเมินตนเองของผู้เรียน" เพื่อการสะท้อนคิด
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center shrink-0">
                <span className="text-xs text-purple-700 font-medium block">คะแนนประเมินตนเอง</span>
                <span className="text-2xl font-black text-purple-900 font-mono">
                  {rubricTotal} <span className="text-xs font-normal text-purple-700">/ 20</span>
                </span>
              </div>
            </div>

            {/* Rubric Criteria 4 Dimensions */}
            <div className="space-y-6">
              {/* Criterion 1: Accuracy */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    ด้านที่ 1: ความถูกต้องตามหลักวิชาการ (Accuracy)
                  </span>
                  <span className="text-xs font-bold text-blue-700 font-mono">
                    {cps.selfAssessment.accuracyScore} / 5 คะแนน
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  คำอธิบายเกณฑ์: ข้อมูลและข้อแนะนำอ้างอิงหลักการ AI Literacy และกฎหมาย/จริยธรรมที่ถูกต้อง ไม่มีข้อมูลเท็จหรือคลาดเคลื่อน
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => {
                        const nextSelf = { ...cps.selfAssessment, accuracyScore: score };
                        handleFieldChange('selfAssessment', 'accuracyScore', score);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        cps.selfAssessment.accuracyScore === score
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 2: Clarity */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    ด้านที่ 2: ความชัดเจนในการสื่อสาร (Clarity)
                  </span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">
                    {cps.selfAssessment.clarityScore} / 5 คะแนน
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  คำอธิบายเกณฑ์: ภาษาเข้าใจง่าย ชัดเจน โครงสร้างเนื้อหาเป็นระเบียบ กลุ่มเป้าหมายสามารถปฏิบัติตามได้ทันที
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleFieldChange('selfAssessment', 'clarityScore', score)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        cps.selfAssessment.clarityScore === score
                          ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 3: Creativity */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    ด้านที่ 3: ความคิดสร้างสรรค์และนวัตกรรม (Creativity)
                  </span>
                  <span className="text-xs font-bold text-cyan-700 font-mono">
                    {cps.selfAssessment.creativityScore} / 5 คะแนน
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  คำอธิบายเกณฑ์: รูปแบบการนำเสนอมีความน่าสนใจ มีมุมมองสดใหม่ และนำกระบวนการ CPS มาประยุกต์ใช้อย่างโดดเด่น
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleFieldChange('selfAssessment', 'creativityScore', score)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        cps.selfAssessment.creativityScore === score
                          ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 4: Responsibility */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    ด้านที่ 4: ความรับผิดชอบและจริยธรรม (Responsibility)
                  </span>
                  <span className="text-xs font-bold text-emerald-700 font-mono">
                    {cps.selfAssessment.responsibilityScore} / 5 คะแนน
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  คำอธิบายเกณฑ์: ชิ้นงานส่งเสริมการเคารพสิทธิ ความเป็นส่วนตัว ความซื่อสัตย์ทางวิชาการ และไม่ส่งเสริมการละเมิด
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleFieldChange('selfAssessment', 'responsibilityScore', score)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        cps.selfAssessment.responsibilityScore === score
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Self Reflection Comment */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ความคิดเห็นสะท้อนตนเองต่อผลงาน (Self-Reflection):
                </label>
                <textarea
                  rows={2}
                  value={cps.selfAssessment.reflectionComment}
                  onChange={(e) => handleFieldChange('selfAssessment', 'reflectionComment', e.target.value)}
                  placeholder="เขียนสรุปความพึงพอใจต่อผลงาน และจุดที่ต้องการพัฒนาต่อยอดในอนาคต..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Navigation to Summary */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ย้อนกลับขั้นที่ 4
              </button>
              <button
                onClick={() => setActiveTab('post-test')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>บันทึกและไปทำแบบทดสอบหลังเรียน</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
