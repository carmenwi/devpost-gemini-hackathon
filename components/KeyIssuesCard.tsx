
import React from 'react';
import { AlertTriangleIcon } from './Icons';

const KeyIssuesCard: React.FC<{ issues: string[] }> = ({ issues }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Key Issues & Incongruencies</h3>
            {issues.length > 0 ? (
                <ul className="space-y-3">
                    {issues.map((issue, index) => (
                        <li key={index} className="flex items-start">
                            <AlertTriangleIcon className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-slate-300">{issue}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-400">No significant issues or incongruencies were detected.</p>
            )}
        </div>
    );
};

export default KeyIssuesCard;
