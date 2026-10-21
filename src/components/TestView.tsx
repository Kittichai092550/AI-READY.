import React, { useState } from 'react';
import { QuizQuestion, UserProgress, NavigationTab } from '../types';
import { PRE_TEST_QUESTIONS, POST_TEST_QUESTIONS } from '../data/testQuestions';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle,
  Award,
  Sparkles
} from 'lucide-react';

interface TestViewProps {
  type: 'pre' | 'post';
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const TestView: React.FC<TestViewProps> = ({
  type,
  progress,
  onUpdateProgress,
  setActiveTab
}) => {
  const isPre = type === 'pre';
  const questions: QuizQuestion[] = isPre ? PRE_TEST_QUESTIONS : POST_TEST_QUESTIONS;
  const isAlreadyCompleted = isPre ? progress.preTestCompleted : progress.postTestCompleted;
  const savedScore = isPre ? progress.preTestScore : progress.postTestScore;
  const savedAnswers = isPre ? progress.preTestAnswers : progress.postTestAnswers;

  const [answers, setAnswers] = useState<Record<number, number>>(savedAnswers || {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(isAlreadyCompleted);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(savedScore);
  const [validationError, setValidationError] = useState<string | null>(null);

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === questions.length;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
    setValidationError(null);
  };

  const handleSubmit = () => {
    if (!isAllAnswered) {
      const unanswered = questions.filter(q => answers[q.id] === undefined).map(q => q.id);
      setValidationError(`กรุณาตอบคำถามให้ครบทุกข้อก่อนส่ง (ข้อที่ยังไม่ได้ตอบ: ${unanswered.join(', ')})`);
      return;
    }

    // Calculate real score
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setCalculatedScore(score);
    setIsSubmitted(true);
    setValidationError(null);

    // Save to global progress
    if (isPre) {
      onUpdateProgress({
        preTestCompleted: true,
        preTestScore: score,
        preTestAnswers: answers
      });
    } else {
      onUpdateProgress({
        postTestCompleted: true,
        postTestScore: score,
        postTestAnswers: answers
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setCalculatedScore(null);
    setValidationError(null);
  };

  // Passing criteria for post-test is 7/10
  const isPassed = !isPre && calculatedScore !== null && calculatedScore >= 7;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <span>{isPre ? 'แบบทดสอบก่อนเรียน (Pre-test)' : 'แบบทดสอบหลังเรียน (Post-test)'}</span>
              <span aria-hidden="true">·</span>
              <span>10 ข้อ 10 คะแนน</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              {isPre ? 'วัดระดับความรู้พื้นฐานก่อนเริ่มเรียน' : 'ประเมินผลการเรียนรู้หลังศึกษาบทเรียน'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isPre 
                ? 'ทำแบบทดสอบเพื่อสำรวจความรู้เดิม ไม่ต้องกังวลเรื่องคะแนน เพื่อใช้วัดพัฒนาการหลังเรียนจบ'
                : 'เกณฑ์การผ่านของแอปพลิเคชันนี้คือ 7/10 คะแนน หากยังไม่ผ่านสามารถทบทวนบทเรียนและทำใหม่ได้'}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 block">ตอบแล้ว</span>
            <span className="text-xl font-bold text-slate-900 font-mono">
              {answeredCount} / {questions.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Result Card (shown when submitted) */}
      {isSubmitted && calculatedScore !== null && (
        <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm ${
          isPre 
            ? 'bg-blue-50/80 border-blue-200' 
            : isPassed 
              ? 'bg-emerald-50/80 border-emerald-300' 
              : 'bg-amber-50/80 border-amber-300'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className={`w-6 h-6 ${isPre ? 'text-blue-700' : isPassed ? 'text-emerald-700' : 'text-amber-700'}`} />
                <h2 className="text-xl font-bold text-slate-900">
                  {isPre 
                    ? 'บันทึกผลคะแนนก่อนเรียนเรียบร้อย' 
                    : isPassed 
                      ? 'ยินดีด้วย! คุณผ่านเกณฑ์การประเมินหลังเรียน' 
                      : 'ยังไม่ผ่านเกณฑ์ 7/10 คะแนน (สามารถทบทวนและทำใหม่ได้)'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isPre 
                  ? 'คุณได้ทำแบบทดสอบก่อนเรียนครบถ้วนแล้ว ต่อไปเข้าสู่ 5 บทเรียนหลักเพื่อสร้างความฉลาดรู้ด้าน AI ครับ'
                  : isPassed
                    ? 'คุณมีความเข้าใจในการใช้งาน AI อย่างสร้างสรรค์ ปลอดภัย และรับผิดชอบตามเกณฑ์ของหลักสูตร'
                    : 'เกณฑ์การผ่านของแอปพลิเคชันนี้กำหนดไว้ที่ 7/10 คะแนน แนะนำให้กลับไปทบทวนบทเรียนและลองทำอีกครั้ง'}
              </p>

              {/* Pre vs Post Comparison if both exist */}
              {!isPre && progress.preTestCompleted && progress.preTestScore !== null && (
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-700">
                  <span>ก่อนเรียน: {progress.preTestScore}/10</span>
                  <span>·</span>
                  <span>หลังเรียน: {calculatedScore}/10</span>
                  <span>·</span>
                  <span className={calculatedScore >= progress.preTestScore ? 'text-emerald-700' : 'text-amber-700'}>
                    พัฒนาการ: {calculatedScore - progress.preTestScore >= 0 ? `+${calculatedScore - progress.preTestScore}` : calculatedScore - progress.preTestScore} คะแนน
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs shrink-0 min-w-36">
              <span className="text-xs text-slate-500 font-medium">คะแนนที่ได้จริง</span>
              <span className="text-3xl font-extrabold text-slate-900 font-mono mt-0.5">
                {calculatedScore} <span className="text-sm font-normal text-slate-500">/ 10</span>
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                {isPre ? 'คะแนนฐานก่อนเรียน' : `เกณฑ์ผ่าน: 7/10`}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200/60 mt-6">
            {isPre ? (
              <button
                onClick={() => setActiveTab('lessons')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>เข้าสู่ 5 บทเรียนหลัก</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('summary')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>ไปหน้าสรุปผลการเรียนรู้และพิมพ์รายงาน</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleRetake}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const userAnswer = answers[q.id];
          const isUserAnswered = userAnswer !== undefined;
          const isCorrect = isSubmitted && userAnswer === q.correctIndex;

          return (
            <div 
              key={q.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-colors ${
                isSubmitted 
                  ? isCorrect 
                    ? 'border-emerald-300 bg-emerald-50/20' 
                    : 'border-red-300 bg-red-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="font-mono font-bold text-blue-700">ข้อที่ {qIndex + 1}</span>
                  <span>·</span>
                  <span>{q.topic}</span>
                </div>
                {isSubmitted && (
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isCorrect ? '1 คะแนน' : '0 คะแนน'}</span>
                  </span>
                )}
              </div>

              {/* Scenario */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs sm:text-sm text-slate-700 mb-3 italic">
                <strong>สถานการณ์:</strong> {q.scenario}
              </div>

              {/* Question text */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-snug">
                {q.question}
              </h3>

              {/* 4 Options */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isChecked = userAnswer === optIdx;
                  let optStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (isChecked && optIdx !== q.correctIndex) {
                      optStyle = 'border-red-400 bg-red-50 text-red-900 line-through';
                    } else {
                      optStyle = 'border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isChecked) {
                    optStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-medium';
                  }

                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={isChecked}
                        disabled={isSubmitted}
                        onChange={() => handleSelectOption(q.id, optIdx)}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="leading-relaxed">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {/* Explanation & Rationale (Revealed strictly AFTER submission) */}
              {isSubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <HelpCircle className="w-4 h-4 text-blue-700" />
                    <span>เฉลยและเหตุผลประกอบ:</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 pl-5">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation Notice & Submit Button */}
      {!isSubmitted && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              สถานะ: ตอบแล้ว {answeredCount} จาก {questions.length} ข้อ
            </span>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:translate-y-[-1px]"
            >
              <span>ส่งคำตอบและตรวจคะแนน</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
