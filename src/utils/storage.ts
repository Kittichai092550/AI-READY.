import { UserProgress, CPSProjectData, AuthorData, DevProcessData } from '../types';

const STORAGE_KEY = 'ai_ready_learning_state_v1';

export const INITIAL_CPS_DATA: CPSProjectData = {
  stepTitles: {
    step1: 'ขั้นที่ 1: ค้นหาข้อเท็จจริง (Fact-Finding)',
    step2: 'ขั้นที่ 2: ระบุปัญหา (Problem-Finding)',
    step3: 'ขั้นที่ 3: สร้างแนวคิด (Idea-Finding)',
    step4: 'ขั้นที่ 4: เลือกและพัฒนาวิธีแก้ปัญหา (Solution-Finding)',
    step5: 'ขั้นที่ 5: ลงมือทำ ทดสอบ และปรับปรุง (Action & Acceptance-Finding)'
  },
  factFinding: {
    scenarioDescription: 'สถานการณ์จำลอง: นักศึกษาใช้ AI ช่วยทำรายงานและสร้างสื่อออนไลน์ แต่พบข้อมูลที่ตรวจสอบไม่ได้ ภาพชวนเข้าใจผิด และการใส่ข้อมูลส่วนตัวลงในเครื่องมือ AI เราจะออกแบบแนวทางใช้ AI ในการเรียนอย่างสร้างสรรค์และรับผิดชอบได้อย่างไร?',
    knownFacts: '',
    unverifiedAssumptions: '',
    requiredSources: ''
  },
  problemFinding: {
    coreProblem: '',
    affectedStakeholders: '',
    howMightWe: 'เราจะทำอย่างไรให้นักศึกษาใช้ AI เป็นผู้ช่วยในการเรียนได้อย่างสร้างสรรค์ ปลอดภัย และมีความรับผิดชอบต่อตนเองและสังคม?'
  },
  ideaFinding: {
    idea1: '',
    idea2: '',
    idea3: '',
    idea4: ''
  },
  solutionFinding: {
    criteriaNotes: {
      usefulness: '',
      feasibility: '',
      accuracy: '',
      responsibility: ''
    },
    selectedIdea: '',
    selectionRationale: ''
  },
  actionAndAcceptance: {
    posterTitle: 'คู่มือ 5 กฎเหล็ก: ใช้ AI อย่างรับผิดชอบและสร้างสรรค์สำหรับนักศึกษา',
    targetAudience: 'นักศึกษามหาวิทยาลัยและเพื่อนร่วมสถาบัน',
    tip1: '1. สั่งงานด้วย RTFC: ระบุ Role, Task, Context และ Format ให้ชัดเจนเพื่อผลลัพธ์ที่ตรงเป้าหมาย',
    tip2: '2. ตรวจสอบก่อนเชื่อ: อย่าไว้ใจแหล่งอ้างอิง AI 100% ตรวจสอบกับฐานข้อมูลวิชาการปฐมภูมิเสมอ',
    tip3: '3. ป้องกันข้อมูลส่วนบุคคล (PDPA): ห้ามป้อนเลขประจำตัว ข้อมูลลับ หรือไฟล์ที่ไม่ได้รับอนุญาตลงใน AI สาธารณะ',
    tip4: '4. ระวังอคติและภาพลวง: สังเกตการเหมารวม และตรวจสอบบริบทของภาพด้วย Reverse Image Search',
    tip5: '5. โปร่งใสทางวิชาการ: ทำบันทึกการใช้ AI (AI Disclosure) และระบุขอบเขตความช่วยเหลือในรายงานเสมอ',
    referencesText: 'สถาบันข้อมูลขนาดใหญ่ (BDI) - AI Literacy, UNESCO Generative AI Guidance for Education',
    theme: 'navy',
    userFeedback: '',
    revisionNotes: '',
    reflectionLearnings: ''
  },
  selfAssessment: {
    accuracyScore: 0,
    clarityScore: 0,
    creativityScore: 0,
    responsibilityScore: 0,
    reflectionComment: ''
  }
};

export const INITIAL_AUTHOR_DATA: AuthorData = {
  studentName: 'เอกรินทร์ พกพูน',
  studentId: '6501123456',
  facultyMajorYear: 'สาขาวิชาเทคโนโลยีและสื่อสารการศึกษา / คณะศึกษาศาสตร์ ชั้นปีที่ 3',
  courseTitle: 'การผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ด้วย AI Vibe Coding (ผลงานที่ 5)',
  instructorName: 'อาจารย์ผู้สอนประจำรายวิชา'
};

export const INITIAL_DEV_PROCESS: DevProcessData = {
  problemAndGoals: 'เป้าหมาย: พัฒนาเว็บแอปพลิเคชันเพื่อการเรียนรู้ด้วยแนวทาง AI Vibe Coding ที่รองรับการเรียนรู้แบบ Project-based Learning และ CPS 5 ขั้นตอน โดยแก้ปัญหานักศึกษาขาดความตระหนักรู้เรื่อง AI Hallucination และความเป็นส่วนตัว',
  consideredApproaches: 'พิจารณาแนวทาง Web App แบบ Interactive ที่มีทั้งบทเรียน แอนิเมชันขั้นตอนการทำงาน ระบบอ่านเสียงภาษาไทย เกมฝึกคิด 3 กิจกรรม แบบทดสอบก่อน-หลังเรียนที่ตรวจคะแนนจริง และกระบวนการทำโครงงาน CPS ที่ออกรายงานได้จริง',
  selectionRationale: 'เลือกพัฒนาเป็น React SPA ด้วย Tailwind CSS พร้อมการจัดเก็บข้อมูลผ่าน localStorage เพื่อความปลอดภัย ไม่ต้องใช้ API กุญแจลับ และผู้เรียนสามารถใช้งานได้ฟรีโดยไม่มีค่าใช้จ่าย',
  toolsAndPromptsUsed: 'ใช้ AI Vibe Coding ร่วมกับเครื่องมือสร้างภาพเฉพาะทางการศึกษา และตรวจทานโค้ดด้วยตนเองตามหลัก Universal Frontend Design Constitution',
  manualRefinements: 'ตรวจสอบและปรับปรุงคำอธิบายภาษาไทยในทุกบทเรียน แก้ไขตรรกะการตรวจคะแนนสอบ ปรับแต่งเสียงสังเคราะห์ Web Speech API ให้มีข้อความแจ้งเตือนที่สุภาพ และจัดวางระบบพิมพ์รายงาน A4',
  actualTestingResults: 'ทดสอบเส้นทางการเรียนรู้ตั้งแต่ทำแบบทดสอบก่อนเรียน เข้าเรียนครบทั้ง 5 บท ทำกิจกรรมเกม 3 กิจกรรม บันทึกโครงงาน CPS และทำแบบทดสอบหลังเรียน พบว่าการคำนวณคะแนนและผลต่างคะแนนทำงานถูกต้อง และข้อมูลไม่สูญหายหลังรีเฟรช',
  limitationsAndFutureWork: 'ข้อจำกัด: เสียงสังเคราะห์ภาษาไทยขึ้นอยู่กับการสนับสนุนของอุปกรณ์และเบราว์เซอร์ของผู้ใช้ แนวทางต่อยอด: สามารถเชื่อมต่อฐานข้อมูลคลาวด์เพื่อให้อาจารย์ตรวจผลงานทั้งชั้นเรียนได้ในอนาคต'
};

export const DEFAULT_PROGRESS: UserProgress = {
  preTestCompleted: false,
  preTestScore: null,
  preTestAnswers: {},
  completedLessons: [],
  postTestCompleted: false,
  postTestScore: null,
  postTestAnswers: {},
  gamesCompleted: {
    factCheck: false,
    promptBuilder: false,
    shareEthics: false
  },
  cpsData: INITIAL_CPS_DATA,
  authorData: INITIAL_AUTHOR_DATA,
  devProcessData: INITIAL_DEV_PROCESS,
  customVideoUrl: ''
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      cpsData: {
        ...INITIAL_CPS_DATA,
        ...(parsed.cpsData || {}),
        stepTitles: { ...INITIAL_CPS_DATA.stepTitles, ...(parsed.cpsData?.stepTitles || {}) },
        factFinding: { ...INITIAL_CPS_DATA.factFinding, ...(parsed.cpsData?.factFinding || {}) },
        problemFinding: { ...INITIAL_CPS_DATA.problemFinding, ...(parsed.cpsData?.problemFinding || {}) },
        ideaFinding: { ...INITIAL_CPS_DATA.ideaFinding, ...(parsed.cpsData?.ideaFinding || {}) },
        solutionFinding: { ...INITIAL_CPS_DATA.solutionFinding, ...(parsed.cpsData?.solutionFinding || {}) },
        actionAndAcceptance: { ...INITIAL_CPS_DATA.actionAndAcceptance, ...(parsed.cpsData?.actionAndAcceptance || {}) },
        selfAssessment: { ...INITIAL_CPS_DATA.selfAssessment, ...(parsed.cpsData?.selfAssessment || {}) }
      },
      authorData: { ...INITIAL_AUTHOR_DATA, ...(parsed.authorData || {}) },
      devProcessData: { ...INITIAL_DEV_PROCESS, ...(parsed.devProcessData || {}) }
    };
  } catch (e) {
    console.error('Error loading progress from localStorage:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress to localStorage:', e);
  }
}

export function resetUserProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing localStorage:', e);
  }
  return DEFAULT_PROGRESS;
}
