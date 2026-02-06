
import React, { useState, useCallback } from 'react';
import { AnalysisResult } from './types';
import { analyzeVideo } from './services/geminiService';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import ResultsDashboard from './components/ResultsDashboard';
import { BrainCircuitIcon, UploadCloudIcon } from './components/Icons';

const App: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
    }
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!videoFile) {
      setError('Please select a video file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeVideo(videoFile);
      setAnalysisResult(result);
    } catch (err: any) {
      console.error(err);
      setError(`Analysis failed: ${err.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [videoFile]);
  
  const handleReset = () => {
    setVideoFile(null);
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
    if(videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoPreviewUrl(null);
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <BrainCircuitIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Entrelyse <span className="text-cyan-400">AI</span>
            </h1>
          </div>
           { (videoFile || analysisResult) && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            >
              Start Over
            </button>
          )}
        </header>

        <main>
          {!analysisResult && !isLoading && (
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-slate-100">Congruence Analysis Engine</h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Upload a mock interview video. Our AI will perform a deep analysis of verbal and non-verbal cues to assess candidate congruence and confidence.
              </p>
              
              <div className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-xl p-8 transition-all">
                <FileUpload onFileChange={handleFileChange} />
                {videoPreviewUrl && (
                  <div className="mt-6">
                    <video controls src={videoPreviewUrl} className="max-w-full mx-auto rounded-lg max-h-80 shadow-lg" />
                    <button
                      onClick={handleAnalyzeClick}
                      disabled={!videoFile || isLoading}
                      className="mt-6 inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
                    >
                      <UploadCloudIcon className="w-6 h-6 mr-3" />
                      Analyze Interview
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isLoading && (
            <Loader message="Analyzing frame-by-frame... this may take a moment." />
          )}

          {error && (
            <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
              <p className="font-semibold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}

          {analysisResult && !isLoading && (
            <ResultsDashboard result={analysisResult} videoPreviewUrl={videoPreviewUrl} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
