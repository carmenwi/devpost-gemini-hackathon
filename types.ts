
export interface CandidateProfile {
  confidence_score: number;
  energy_level: 'Low' | 'Balanced' | 'High' | 'Manic';
  hire_recommendation: 'HIRE' | 'CONSIDER' | 'NO HIRE';
}

export interface AnalysisVectors {
  visual: {
    eye_contact: string;
    posture: string;
    facial_expressions: string;
  };
  vocal: {
    tone: string;
    clarity: string;
    filler_words_usage: string;
  };
}

export interface EmotionalTimelinePoint {
  timestamp: string; // "MM:SS"
  emotion: string;
  intensity: number; // 0-10
  observation: string;
}

export interface AnalysisResult {
  candidate_profile: CandidateProfile;
  executive_summary: string;
  analysis_vectors: AnalysisVectors;
  key_issues: string[];
  emotional_timeline: EmotionalTimelinePoint[];
}
