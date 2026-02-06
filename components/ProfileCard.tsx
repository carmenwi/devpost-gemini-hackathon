
import React from 'react';
import { CandidateProfile } from '../types';
import { UserCheckIcon, ZapIcon, ClipboardCheckIcon, UserXIcon, UserIcon } from './Icons';

const getRecommendationInfo = (recommendation: CandidateProfile['hire_recommendation']) => {
  switch (recommendation) {
    case 'HIRE':
      return {
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500',
        Icon: ClipboardCheckIcon
      };
    case 'CONSIDER':
      return {
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500',
        Icon: UserIcon
      };
    case 'NO HIRE':
      return {
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500',
        Icon: UserXIcon
      };
    default:
      return {
        color: 'text-slate-400',
        bgColor: 'bg-slate-500/10',
        borderColor: 'border-slate-500',
        Icon: UserIcon
      };
  }
};


const ProfileCard: React.FC<{ profile: CandidateProfile }> = ({ profile }) => {
    const { confidence_score, energy_level, hire_recommendation } = profile;
    const circumference = 2 * Math.PI * 45; // r = 45
    const offset = circumference - (confidence_score / 100) * circumference;

    const recommendationInfo = getRecommendationInfo(hire_recommendation);

    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Candidate Profile</h3>
            <div className="flex flex-col items-center space-y-6">
                <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" stroke="#334155" strokeWidth="10" fill="none" />
                        <circle
                            cx="50" cy="50" r="45"
                            stroke="#22d3ee" strokeWidth="10" fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                            className="transition-all duration-1000 ease-in-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-cyan-400">{confidence_score}</span>
                        <span className="text-lg text-cyan-500">%</span>
                    </div>
                </div>
                <p className="text-slate-300 font-semibold text-lg -mt-2">Confidence Score</p>

                <div className="w-full pt-4 border-t border-slate-700 text-center">
                    <div className="flex justify-around">
                        <div className="flex flex-col items-center">
                            <ZapIcon className="w-6 h-6 text-yellow-400 mb-1" />
                            <span className="text-xs text-slate-400">Energy</span>
                            <span className="font-semibold text-white">{energy_level}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <recommendationInfo.Icon className={`w-6 h-6 mb-1 ${recommendationInfo.color}`} />
                            <span className="text-xs text-slate-400">Verdict</span>
                            <span className={`font-semibold ${recommendationInfo.color}`}>{hire_recommendation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
