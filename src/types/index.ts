/**
 * Types for AI READY learning web application
 */

export type NavigationTab = 
  | 'home' 
  | 'pre-test' 
  | 'lessons' 
  | 'games' 
  | 'cps-project' 
  | 'post-test' 
  | 'summary' 
  | 'about';

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  exampleBad?: string;
  exampleGood?: string;
  exampleExplanation?: string;
}

export interface Lesson {
  id: number;
  title: string;
  shortTitle: string;
  estimatedMinutes: number;
  objective: string;
  description: string;
  audioScript: string;
  sections: LessonSection[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  summaryTakeaways: string[];
}

export interface CPSProjectData {
  stepTitles: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };
  // Step 1: Fact-finding
  factFinding: {
    scenarioDescription: string;
    knownFacts: string;
    unverifiedAssumptions: string;
    requiredSources: string;
  };
  // Step 2: Problem-finding
  problemFinding: {
    coreProblem: string;
    affectedStakeholders: string;
    howMightWe: string;
  };
  // Step 3: Idea-finding
  ideaFinding: {
    idea1: string;
    idea2: string;
    idea3: string;
    idea4?: string;
  };
  // Step 4: Solution-finding
  solutionFinding: {
    criteriaNotes: {
      usefulness: string;
      feasibility: string;
      accuracy: string;
      responsibility: string;
    };
    selectedIdea: string;
    selectionRationale: string;
  };
  // Step 5: Action & Acceptance
  actionAndAcceptance: {
    posterTitle: string;
    targetAudience: string;
    tip1: string;
    tip2: string;
    tip3: string;
    tip4: string;
    tip5: string;
    referencesText: string;
    theme: 'navy' | 'indigo' | 'cyan' | 'minimal';
    // Real testing results (no auto-fill)
    userFeedback: string;
    revisionNotes: string;
    reflectionLearnings: string;
  };
  // Self assessment
  selfAssessment: {
    accuracyScore: number;      // 1-5
    clarityScore: number;       // 1-5
    creativityScore: number;    // 1-5
    responsibilityScore: number;// 1-5
    reflectionComment: string;
  };
}

export interface AuthorData {
  studentName: string;
  studentId: string;
  facultyMajorYear: string;
  courseTitle: string;
  instructorName: string;
}

export interface DevProcessData {
  problemAndGoals: string;
  consideredApproaches: string;
  selectionRationale: string;
  toolsAndPromptsUsed: string;
  manualRefinements: string;
  actualTestingResults: string;
  limitationsAndFutureWork: string;
}

export interface UserProgress {
  preTestCompleted: boolean;
  preTestScore: number | null;
  preTestAnswers: Record<number, number>;
  completedLessons: number[];
  postTestCompleted: boolean;
  postTestScore: number | null;
  postTestAnswers: Record<number, number>;
  gamesCompleted: {
    factCheck: boolean;
    promptBuilder: boolean;
    shareEthics: boolean;
  };
  cpsData: CPSProjectData;
  authorData: AuthorData;
  devProcessData: DevProcessData;
  customVideoUrl?: string;
}
