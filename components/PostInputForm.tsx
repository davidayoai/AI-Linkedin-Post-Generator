
import React from 'react';
import { Tone } from '../types';

interface PostInputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.826L11.25 9.25v1.5L4.643 11.01a.75.75 0 00-.826.95l-1.414 4.949a.75.75 0 00.95.826L16.25 12.25a.75.75 0 000-1.5L3.105 2.289z" />
  </svg>
);

export const PostInputForm: React.FC<PostInputFormProps> = ({ topic, setTopic, tone, setTone, onSubmit, isLoading }) => {
  const tones = Object.values(Tone);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
          1. What's the topic of your post?
        </label>
       <textarea
  id="topic"
  rows={4}
  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-linkedin-blue focus:border-linkedin-blue transition-shadow duration-200"
  placeholder="e.g., The future of remote work and its impact on company culture"
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  onKeyDown={handleKeyDown}
/>

        <p className="text-xs text-gray-500 mt-1">Tip: Press Ctrl+Enter or Cmd+Enter to generate.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          2. Choose a tone
        </label>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                tone === t
                  ? 'bg-linkedin-blue text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={onSubmit}
        disabled={isLoading || !topic.trim()}
        className="w-full flex items-center justify-center gap-2 bg-linkedin-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-linkedin-blue-light focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? 'Generating...' : 'Generate Post'}
        {!isLoading && <SendIcon />}
      </button>
    </div>
  );
};
