import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import AudioRecorder from './components/AudioRecorder';
import CryAnalysis from './components/CryAnalysis';
import type { CryRecord } from './types';

function App() {
  const [records, setRecords] = useState<CryRecord[]>([]);

  const handleRecordingComplete = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const newRecord: CryRecord = {
      id: Date.now().toString(),
      timestamp: new Date(),
      duration: 5, // Example duration
      type: analyzeCry(), // In a real app, this would use ML to analyze the cry
      notes: "Baby might be hungry or tired",
      name: `Cry Recording ${records.length + 1}`,
      audioUrl: url
    };
    setRecords(prev => [newRecord, ...prev]);
  };

  const handleUpdateRecord = (id: string, updates: Partial<CryRecord>) => {
    setRecords(prev => prev.map(record => 
      record.id === id ? { ...record, ...updates } : record
    ));
  };

  // Placeholder function - in a real app, this would use ML to analyze the cry
  const analyzeCry = () => {
    const types = ['Hunger', 'Tiredness', 'Discomfort', 'Pain'];
    return types[Math.floor(Math.random() * types.length)];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Baby size={40} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">Baby Cry Analyzer</h1>
          </div>
          <p className="text-gray-600">Record and analyze your baby's cries to better understand their needs</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Record Cry</h2>
          <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        </div>

        <CryAnalysis 
          records={records} 
          onUpdateRecord={handleUpdateRecord}
        />
      </div>
    </div>
  );
}

export default App;