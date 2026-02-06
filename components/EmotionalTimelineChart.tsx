
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { EmotionalTimelinePoint } from '../types';

interface EmotionalTimelineChartProps {
  timeline: EmotionalTimelinePoint[];
}

const parseTimestamp = (timestamp: string): number => {
    const parts = timestamp.split(':').map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }
    return 0;
};

const formatSeconds = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-700 p-3 rounded-md border border-slate-600 shadow-lg text-sm">
        <p className="label font-bold text-white">{`Time: ${formatSeconds(label)}`}</p>
        <p className="intro text-cyan-400">{`Emotion: ${data.emotion}`}</p>
        <p className="text-slate-300">{`Intensity: ${data.intensity}/10`}</p>
        <p className="desc text-slate-300 mt-2 max-w-xs">{`Observation: ${data.observation}`}</p>
      </div>
    );
  }

  return null;
};

const EmotionalTimelineChart: React.FC<EmotionalTimelineChartProps> = ({ timeline }) => {
    const data = timeline
        .map(point => ({
            ...point,
            time: parseTimestamp(point.timestamp),
        }))
        .sort((a, b) => a.time - b.time);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                        dataKey="time" 
                        type="number" 
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={formatSeconds} 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        domain={[0, 10]}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: '#e2e8f0', paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="intensity" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name="Emotional Intensity" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EmotionalTimelineChart;
