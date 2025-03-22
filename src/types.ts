export interface CryRecord {
  id: string;
  timestamp: Date;
  duration: number;
  type: string;
  notes: string;
  name: string;
  audioUrl?: string;
}

export interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}