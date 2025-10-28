
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PostInputForm } from './components/PostInputForm';
import { GeneratedPost } from './components/GeneratedPost';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorAlert } from './components/ErrorAlert';
import { generateLinkedInPost } from './services/geminiService';
import { Tone } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.Professional);
  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePost = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for your post.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPost('');

    try {
      const post = await generateLinkedInPost(topic, tone);
      setGeneratedPost(post);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate post. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [topic, tone]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
          <p className="text-lg text-gray-600 mb-6 text-center">
            Craft the perfect LinkedIn post in seconds. Enter your topic, select a tone, and let our AI do the rest.
          </p>
          <PostInputForm
            topic={topic}
            setTopic={setTopic}
            tone={tone}
            setTone={setTone}
            onSubmit={handleGeneratePost}
            isLoading={isLoading}
          />
        </div>
        
        {isLoading && <LoadingSpinner />}
        
        {error && <ErrorAlert message={error} />}
        
        {generatedPost && !isLoading && (
          <GeneratedPost post={generatedPost} />
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by AI. Always review generated content before posting.</p>
      </footer>
    </div>
  );
};

export default App;
