
import React from 'react';
import { AnalysisResult } from '../types';
import ProfileCard from './ProfileCard';
import AnalysisVectorsCard from './AnalysisVectorsCard';
import KeyIssuesCard from './KeyIssuesCard';
import EmotionalTimelineChart from './EmotionalTimelineChart';

interface ResultsDashboardProps {
  result: AnalysisResult;
  videoPreviewUrl: string | null;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, videoPreviewUrl }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Executive Summary</h2>
        <blockquote className="border-l-4 border-cyan-500 pl-4">
          <p className="text-lg italic text-slate-300">"{result.executive_summary}"</p>
        </blockquote>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {videoPreviewUrl && (
            <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-3">Interview Video</h3>
              <video controls src={videoPreviewUrl} className="w-full rounded-lg" />
            </div>
          )}
          <ProfileCard profile={result.candidate_profile} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <AnalysisVectorsCard vectors={result.analysis_vectors} />
          <KeyIssuesCard issues={result.key_issues} />
        </div>
      </div>
      
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Emotional Timeline</h2>
          <p className="text-slate-400 mb-6">Tracking emotional intensity and key non-verbal cues over time.</p>
          <EmotionalTimelineChart timeline={result.emotional_timeline} />
      </div>

    </div>
  );
};

export default ResultsDashboard;
