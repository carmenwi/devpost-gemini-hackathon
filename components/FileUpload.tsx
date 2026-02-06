
import React, { useState, useRef } from 'react';
import { UploadCloudIcon } from './Icons';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setFileName(file.name);
      onFileChange(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="flex flex-col items-center justify-center p-6 text-center cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
        className="hidden"
      />
      <UploadCloudIcon className="w-16 h-16 text-slate-500 mb-4" />
      <p className="text-lg font-semibold text-slate-300">
        {fileName ? `Selected: ${fileName}` : "Click or drag & drop video file"}
      </p>
      <p className="text-sm text-slate-400">MP4, MOV, WEBM, etc. are supported.</p>
    </div>
  );
};

export default FileUpload;
