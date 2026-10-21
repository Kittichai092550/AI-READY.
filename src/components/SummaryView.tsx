import React, { useState } from 'react';
import { UserProgress, NavigationTab } from '../types';
import { 
  Printer, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  User, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SummaryViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const [learnerName, setLearnerName] = useState<string>(progress.authorData.studentName || '');
  const [learnerId, setLearnerId] = useState<string>(progress.authorData.studentId || '');

  const handlePrint = () => {
    window.print();
  };

  // Calculate score difference (delta)
  const hasBothScores = progress.preTestScore !== null && progress.postTestScore !== null;
  const scoreDelta = hasBothScores 
    ? (progress.postTestScore as number) - (progress.preTestScore as number) 
    : null;

  // Passing status (7/10)
  const isPostPassed = progress.postTestScore !== null && progress.postTestScore >= 7;

  // CPS Completeness check
  const cps = progress.cpsData;
  const isCpsComplete = Boolean(
    cps.factFinding.knownFacts &&
    cps.problemFinding.coreProblem &&
    cps.ideaFinding.idea1 &&
    cps.solutionFinding.selectedIdea &&
    cps.actionAndAcceptance.userFeedback
  );

  const rubricTotal = 
    (cps.selfAssessment.accuracyScore || 0) +
    (cps.selfAssessment.clarityScore || 0) +
    (cps.selfAssessment.creativityScore || 0) +
    (cps.selfAssessment.responsibilityScore || 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner - Screen Only */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              รายงานหลักฐานการเรียนรู้และการประเมินผล (Learning Evidence & Summary)
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              สรุปผลการเรียนรู้ “AI READY — รู้ทัน AI ใช้เป็นอย่างสร้างสรรค์”
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ผลการประเมินตามจริงจากคำตอบของผู้เรียน สามารถพิมพ์เป็นรายงานเอกสารผลงานรายบุคคลได้ทันที
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์รายงานสรุปผล (A4/PDF)</span>
          </button>
        </div>

        {/* Quick Student Name Config (Sync with Author info) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ชื่อผู้เรียน (จะแสดงในรายงานสรุป):
            </label>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => {
                setLearnerName(e.target.value);
                onUpdateProgress({
                  authorData: {
                    ...progress.authorData,
                    studentName: e.target.value
                  }
                });
              }}
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
              placeholder="กรอกชื่อ-นามสกุล..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              รหัสนักศึกษา:
            </label>
            <input
              type="text"
              value={learnerId}
              onChange={(e) => {
                setLearnerId(e.target.value);
                onUpdateProgress({
                  authorData: {
                    ...progress.authorData,
                    studentId: e.target.value
                  }
                });
              }}
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
              placeholder="กรอกรหัสนักศึกษา..."
            />
          </div>
        </div>
      </div>

      {/* PRINTABLE OFFICIAL REPORT CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Printable Official Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              รายงานผลการเรียนรู้รายบุคคล (Individual Learning Portfolio Report)
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              AI READY — รู้ทัน AI ใช้เป็นอย่างสร้างสรรค์
            </h2>
            <p className="text-xs text-slate-600">
              ผลงานที่ 5: ผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ด้วย AI Vibe Coding ระดับมหาวิทยาลัย
            </p>
          </div>

          <div className="text-right text-xs text-slate-600 shrink-0 space-y-0.5 border-t sm:border-t-0 sm:border-l sm:pl-4 border-slate-200 pt-2 sm:pt-0">
            <p><strong>ผู้เรียน:</strong> {learnerName || 'ยังไม่ได้ระบุชื่อ'}</p>
            <p><strong>รหัสนักศึกษา:</strong> {learnerId || 'ยังไม่ได้ระบุ'}</p>
            <p><strong>รายวิชา:</strong> {progress.authorData.courseTitle}</p>
            <p><strong>อาจารย์ผู้สอน:</strong> {progress.authorData.instructorName}</p>
          </div>
        </div>

        {/* 1. Score Summary & Comparison Matrix */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-700" />
            <span>1. ผลคะแนนแบบทดสอบและการประเมิน (Assessment Results)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Pre-test box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">คะแนนก่อนเรียน (Pre-test)</span>
              <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                {progress.preTestScore !== null ? `${progress.preTestScore}/10` : 'ยังไม่ได้ทำ'}
              </p>
              <span className="text-[11px] text-slate-400">10 ข้อ ปรนัย 4 ตัวเลือก</span>
            </div>

            {/* Post-test box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">คะแนนหลังเรียน (Post-test)</span>
              <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                {progress.postTestScore !== null ? `${progress.postTestScore}/10` : 'ยังไม่ได้ทำ'}
              </p>
              <span className="text-[11px] text-slate-400">เกณฑ์ผ่าน: 7/10 คะแนน</span>
            </div>

            {/* Delta box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">ผลต่างคะแนน (Score Delta)</span>
              <p className="text-2xl font-extrabold font-mono mt-1">
                {scoreDelta !== null ? (
                  <span className={scoreDelta >= 0 ? 'text-emerald-700' : 'text-amber-700'}>
                    {scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta}
                  </span>
                ) : (
                  <span className="text-slate-400 text-base">ยังไม่ได้ทำ</span>
                )}
              </p>
              <span className="text-[11px] text-slate-400">
                {scoreDelta !== null && scoreDelta >= 0 ? 'มีพัฒนาการเชิงบวก' : 'ผลต่างตามจริง'}
              </span>
            </div>

            {/* Overall Passing Status */}
            <div className={`p-4 rounded-xl border ${
              progress.postTestScore === null
                ? 'bg-slate-50 border-slate-200 text-slate-600'
                : isPostPassed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <span className="text-xs font-medium block">สถานะการประเมินผล</span>
              <p className="text-lg font-bold mt-1">
                {progress.postTestScore === null 
                  ? 'ยังไม่ได้ทำ' 
                  : isPostPassed 
                    ? 'ผ่านเกณฑ์ (Passed)' 
                    : 'ยังไม่ผ่านเกณฑ์ (Retake)'}
              </p>
              <span className="text-[11px] opacity-80">
                {progress.postTestScore !== null && (isPostPassed ? 'ผ่านเกณฑ์ 7/10 ของแอป' : 'ต้องได้ 7/10 ขึ้นไป')}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Lessons & Games Completion Checklist */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>2. หลักฐานการผ่านบทเรียนและกิจกรรมเกม (Curriculum & Activities Completion)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>ความก้าวหน้า 5 บทเรียน:</span>
                <span className="font-mono">{progress.completedLessons.length} / 5 บท</span>
              </div>
              <ul className="text-xs space-y-1 text-slate-600">
                {[1, 2, 3, 4, 5].map((id) => {
                  const done = progress.completedLessons.includes(id);
                  return (
                    <li key={id} className="flex items-center justify-between">
                      <span>บทที่ {id}: {id === 1 ? 'รู้จัก AI รอบตัว' : id === 2 ? 'เขียน Prompt ให้ได้งาน' : id === 3 ? 'เช็กก่อนเชื่อ' : id === 4 ? 'ใช้ AI อย่างรับผิดชอบ' : 'สร้างสรรค์งานร่วมกับ AI'}</span>
                      <span className={done ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                        {done ? '✓ สำเร็จ' : 'ยังไม่ได้ทำ'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>สถานะกิจกรรมเกม 3 กิจกรรม:</span>
                <span className="font-mono">
                  {Object.values(progress.gamesCompleted).filter(Boolean).length} / 3 กิจกรรม
                </span>
              </div>
              <ul className="text-xs space-y-1 text-slate-600">
                <li className="flex items-center justify-between">
                  <span>เกมที่ 1: เช็กก่อนเชื่อ (Fact-Checking)</span>
                  <span className={progress.gamesCompleted.factCheck ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                    {progress.gamesCompleted.factCheck ? '✓ สำเร็จ' : 'ยังไม่ได้ทำ'}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>เกมที่ 2: Prompt Builder (RTFC Framework)</span>
                  <span className={progress.gamesCompleted.promptBuilder ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                    {progress.gamesCompleted.promptBuilder ? '✓ สำเร็จ' : 'ยังไม่ได้ทำ'}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>เกมที่ 3: แชร์ได้ไหม? (Privacy & Ethics)</span>
                  <span className={progress.gamesCompleted.shareEthics ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                    {progress.gamesCompleted.shareEthics ? '✓ สำเร็จ' : 'ยังไม่ได้ทำ'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. CPS Project 5-Step Documentation */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-700" />
            <span>3. ผลการดำเนินงานโครงงาน CPS 5 ขั้นตอน (Creative Problem Solving Record)</span>
          </h3>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-xs font-bold text-blue-900 block">{cps.stepTitles.step1}</span>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>สิ่งที่รู้แล้ว:</strong> {cps.factFinding.knownFacts || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>ข้อสงสัยที่ต้องตรวจสอบ:</strong> {cps.factFinding.unverifiedAssumptions || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>แหล่งข้อมูลอ้างอิง:</strong> {cps.factFinding.requiredSources || 'ยังไม่ได้บันทึก'}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-xs font-bold text-indigo-900 block">{cps.stepTitles.step2}</span>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>ปัญหาหลัก:</strong> {cps.problemFinding.coreProblem || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>ผู้ได้รับผลกระทบ:</strong> {cps.problemFinding.affectedStakeholders || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>คำถามท้าทาย (How Might We):</strong> {cps.problemFinding.howMightWe || 'ยังไม่ได้บันทึก'}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-xs font-bold text-cyan-900 block">{cps.stepTitles.step3}</span>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>แนวคิดที่ 1:</strong> {cps.ideaFinding.idea1 || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>แนวคิดที่ 2:</strong> {cps.ideaFinding.idea2 || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>แนวคิดที่ 3:</strong> {cps.ideaFinding.idea3 || 'ยังไม่ได้บันทึก'}</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <span className="text-xs font-bold text-slate-900 block">{cps.stepTitles.step4}</span>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>แนวคิดที่เลือก:</strong> {cps.solutionFinding.selectedIdea || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>เหตุผลในการเลือก:</strong> {cps.solutionFinding.selectionRationale || 'ยังไม่ได้บันทึก'}</p>
                <p>
                  <strong>เกณฑ์ประเมิน (ประโยชน์/ความเป็นไปได้/ความถูกต้อง/ความรับผิดชอบ):</strong>{' '}
                  {cps.solutionFinding.criteriaNotes.usefulness || '-'}
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-xs font-bold text-emerald-900 block">{cps.stepTitles.step5}</span>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>ชื่อชิ้นงานที่สร้าง:</strong> {cps.actionAndAcceptance.posterTitle}</p>
                <p><strong>กลุ่มเป้าหมาย:</strong> {cps.actionAndAcceptance.targetAudience}</p>
                <p><strong>ผลการทดลองใช้จริง:</strong> {cps.actionAndAcceptance.userFeedback || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>ข้อเสนอแนะที่ได้รับจริง:</strong> {cps.actionAndAcceptance.revisionNotes || 'ยังไม่ได้บันทึก'}</p>
                <p><strong>สิ่งที่ได้เรียนรู้:</strong> {cps.actionAndAcceptance.reflectionLearnings || 'ยังไม่ได้บันทึก'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Self-Assessment Breakdown */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>4. ผลการประเมินตนเองตามเกณฑ์รูบริก (Self-Assessment Breakdown)</span>
            </span>
            <span className="text-xs font-mono font-bold text-purple-800">
              รวม {rubricTotal} / 20 คะแนน
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <span className="text-slate-500 block">ความถูกต้อง (Accuracy)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {cps.selfAssessment.accuracyScore} / 5
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <span className="text-slate-500 block">ความชัดเจน (Clarity)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {cps.selfAssessment.clarityScore} / 5
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <span className="text-slate-500 block">ความสร้างสรรค์ (Creativity)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {cps.selfAssessment.creativityScore} / 5
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <span className="text-slate-500 block">ความรับผิดชอบ (Responsibility)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {cps.selfAssessment.responsibilityScore} / 5
              </span>
            </div>
          </div>

          {cps.selfAssessment.reflectionComment && (
            <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-xl text-xs text-purple-950">
              <strong>การสะท้อนคิดของตนเอง:</strong> {cps.selfAssessment.reflectionComment}
            </div>
          )}
        </div>

        {/* Signature & Date Verification Line */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <p>รับรองว่าผลงานนี้จัดทำขึ้นด้วยกระบวนการเรียนรู้และบันทึกข้อมูลตามจริง</p>
            <p className="text-[11px] text-slate-400 mt-0.5">ระบบบันทึกความก้าวหน้า AI READY Platform v1.0</p>
          </div>
          <div className="text-center sm:text-right">
            <div className="w-48 border-b border-slate-400 mb-1 mx-auto sm:ml-auto" />
            <p className="text-slate-700 font-medium">ลงชื่อผู้เรียน ({learnerName || '...........................................'})</p>
          </div>
        </div>
      </div>
    </div>
  );
};
