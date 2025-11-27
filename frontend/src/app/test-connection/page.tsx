'use client';

import { useState, useEffect } from 'react';

export default function TestConnection() {
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [message, setMessage] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    setApiUrl(url);
    setStatus('checking');

    try {
      const response = await fetch(`${url}/api/v1/health`);
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(`Connected! Server is ${data.status} (${data.environment})`);
      } else {
        setStatus('error');
        setMessage('Server responded but with an error');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Backend Connection Test</h1>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">API URL:</p>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
              {apiUrl}
            </p>
          </div>

          <div className="flex items-center justify-center py-8">
            {status === 'checking' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Checking connection...</p>
              </div>
            )}
            
            {status === 'success' && (
              <div className="text-center">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <p className="text-green-600 dark:text-green-400 font-medium">{message}</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">✗</div>
                <p className="text-red-600 dark:text-red-400 font-medium">{message}</p>
              </div>
            )}
          </div>

          <button
            onClick={testConnection}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Test Again
          </button>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Troubleshooting:</strong>
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1 list-disc list-inside">
              <li>Ensure backend is running on port 5000</li>
              <li>Check NEXT_PUBLIC_API_URL in .env.local</li>
              <li>Verify MongoDB is running</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
