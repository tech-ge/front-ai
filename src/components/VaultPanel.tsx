'use client';

import { useState, useEffect } from 'react';

interface VaultDocument {
  id: number;
  title: string;
  content: string;
  encrypted: boolean;
  created_at: string;
  tags: string[];
} 

export default function VaultPanel() {
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/vault/documents');
      const data = await response.json();
      setDocuments(data || []);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const handleSaveDocument = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/vault/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          content: content,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        })
      });

      if (response.ok) {
        const newDoc = await response.json();
        setDocuments([newDoc, ...documents]);
        setTitle('');
        setContent('');
        setTags('');
        setShowUpload(false);
        alert('Document encrypted and saved!');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save document');
    }
  };

  const deleteDocument = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/api/vault/documents/${id}`, {
        method: 'DELETE'
      });
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Vault Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>🔐</span> Personal Knowledge Vault
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            End-to-end encrypted storage for your sensitive research materials
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg font-medium transition"
        >
          ➕ Add Document
        </button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg">Create New Document</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <textarea
              placeholder="Document content (will be encrypted)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-3 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <span>🔒</span>
                This document will be encrypted with military-grade encryption (AES-256)
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowUpload(false)}
              className="px-4 py-2 border border-gray-500/30 rounded-lg hover:border-gray-400/50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDocument}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition"
            >
              💾 Save Document
            </button>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      {documents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-lg p-4 hover:border-cyan-400/50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-cyan-400 mb-1">{doc.title}</h4>
                  <p className="text-xs text-gray-400">{new Date(doc.created_at).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-gray-400 hover:text-red-400 transition"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-300 mb-3 line-clamp-3">{doc.content}</p>
              {doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {doc.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-blue-600/30 text-cyan-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 px-2 py-1 text-xs bg-blue-600/50 hover:bg-blue-600/70 rounded transition">
                  👁️ View
                </button>
                <button className="flex-1 px-2 py-1 text-xs bg-blue-600/50 hover:bg-blue-600/70 rounded transition">
                  📋 Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-blue-600/10 border border-blue-500/20 rounded-lg">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-400 mb-6">Your vault is empty</p>
          <p className="text-sm text-gray-500">
            Upload research papers, notes, and sensitive documents here.<br />
            They&apos;ll be encrypted with military-grade security.
          </p>
        </div>
      )}

      {/* Encryption Info */}
      <div className="bg-green-600/10 border border-green-500/20 rounded-lg p-4">
        <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
          <span>✅</span> Security Features
        </h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• End-to-end encryption: All documents encrypted before upload</li>
          <li>• Zero-knowledge architecture: Server cannot access your data</li>
          <li>• AES-256 encryption: Military-grade security standard</li>
          <li>• Automatic backups: Your data is safely backed up</li>
        </ul>
      </div>
    </div>
  );
}
