import React, { useState } from 'react';
import { AlertTriangle, Volume2, Clock, FileText, Edit2, Check } from 'lucide-react';
import type { CryRecord } from '../types';
import { format } from 'date-fns';

interface CryAnalysisProps {
  records: CryRecord[];
  onUpdateRecord: (id: string, updates: Partial<CryRecord>) => void;
}

const CryAnalysis: React.FC<CryAnalysisProps> = ({ records, onUpdateRecord }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');

  const handleEditClick = (record: CryRecord) => {
    setEditingId(record.id);
    setEditName(record.name);
  };

  const handleSave = (id: string) => {
    onUpdateRecord(id, { name: editName });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Cry Analysis History</h2>
      {records.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No cry records yet. Start recording to analyze.</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {editingId === record.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave(record.id)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium">{record.name}</span>
                      <button
                        onClick={() => handleEditClick(record)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 size={16} />
                      </button>
                    </>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {format(record.timestamp, 'MMM d, yyyy HH:mm')}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                <span className="font-medium">Type: {record.type}</span>
                <span className="text-sm font-medium text-blue-500 ml-auto">
                  {record.duration}s
                </span>
              </div>
              
              {record.audioUrl && (
                <div className="mb-2">
                  <audio controls src={record.audioUrl} className="w-full" />
                </div>
              )}
              
              {record.notes && (
                <div className="mt-2 text-gray-600 text-sm">
                  <p>{record.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryAnalysis;