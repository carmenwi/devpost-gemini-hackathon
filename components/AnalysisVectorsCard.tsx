
import React from 'react';
import { AnalysisVectors } from '../types';
import { EyeIcon, MicIcon, UserIcon as PostureIcon } from './Icons';

const VectorItem: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 h-6 w-6 text-slate-400 mr-3 mt-1">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="font-semibold text-slate-100">{value}</p>
        </div>
    </div>
);


const AnalysisVectorsCard: React.FC<{ vectors: AnalysisVectors }> = ({ vectors }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Analysis Vectors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-cyan-400 mb-3 border-b border-slate-700 pb-2">Visual Cues</h4>
                    <div className="space-y-4">
                        <VectorItem label="Eye Contact" value={vectors.visual.eye_contact} icon={<EyeIcon />} />
                        <VectorItem label="Posture" value={vectors.visual.posture} icon={<PostureIcon />} />
                        <VectorItem label="Facial Expressions" value={vectors.visual.facial_expressions} icon={<PostureIcon />} />
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-cyan-400 mb-3 border-b border-slate-700 pb-2">Vocal Cues</h4>
                    <div className="space-y-4">
                        <VectorItem label="Tone" value={vectors.vocal.tone} icon={<MicIcon />} />
                        <VectorItem label="Clarity" value={vectors.vocal.clarity} icon={<MicIcon />} />
                        <VectorItem label="Filler Words" value={vectors.vocal.filler_words_usage} icon={<MicIcon />} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisVectorsCard;
