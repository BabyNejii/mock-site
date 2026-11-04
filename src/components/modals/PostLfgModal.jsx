import React, { useState } from 'react';
import { X } from 'lucide-react';
import FormField from './FormField';

export default function PostLfgModal({ isOpen, onClose, onPostSuccess }) {
  const [formData, setFormData] = useState({
    type: 'Looking for Squad',
    author: '',
    affiliation: 'Technical University of Sofia',
    targetEvent: 'Security BSides Sofia 2027 CTF',
    role: 'Web Security',
    experienceLevel: 'Intermediate',
    discordHandle: '',
    description: '',
    tags: 'TU Sofia, Web, BSides'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.author || !formData.discordHandle) return;

    const newPost = {
      id: `lfg-${Date.now()}`,
      type: formData.type,
      author: formData.author,
      affiliation: formData.affiliation,
      targetEvent: formData.targetEvent,
      role: formData.role,
      experienceLevel: formData.experienceLevel,
      discordHandle: formData.discordHandle,
      description: formData.description,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      postedAt: 'Just now'
    };

    onPostSuccess(newPost);
    onClose();
  };

  const typeButtonClass = (active) =>
    `py-1.5 px-3 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
      active
        ? 'border-accent bg-accent/10 text-accent'
        : 'border-border-default text-secondary hover:bg-surface'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border-default bg-elevated p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-divide">
          <div>
            <h3 className="font-display text-xl font-bold text-strong">
              Create Team Finder Listing
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Connect with classmates or recruit for upcoming competitions
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-border-default hover:bg-surface text-muted hover:text-strong transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {/* Post Type Selector */}
          <div>
            <label className="block mb-1 font-semibold text-secondary">
              Listing Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Looking for Squad' })}
                className={typeButtonClass(formData.type === 'Looking for Squad')}
              >
                Looking for Squad
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Squad Recruiting' })}
                className={typeButtonClass(formData.type === 'Squad Recruiting')}
              >
                Squad Recruiting
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label={formData.type === 'Squad Recruiting' ? 'Squad Name *' : 'Handle / Name *'}
              required
              placeholder="e.g. Stefan_TU"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <FormField
              label="Discord Handle *"
              required
              mono
              placeholder="e.g. stefan#1234"
              value={formData.discordHandle}
              onChange={(e) => setFormData({ ...formData, discordHandle: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="University or Affiliation"
              placeholder="e.g. TU Sofia, 2nd yr"
              value={formData.affiliation}
              onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
            />
            <FormField
              label="Discipline Focus"
              placeholder="e.g. Web, Crypto, Pwn"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>

          <FormField
            label="Target Event"
            placeholder="e.g. Security BSides Sofia 2027"
            value={formData.targetEvent}
            onChange={(e) => setFormData({ ...formData, targetEvent: e.target.value })}
          />

          <FormField
            label="Listing Description"
            type="textarea"
            rows={2}
            required
            placeholder="Describe challenges you practice or what you need from teammates..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-border-default text-strong hover:bg-surface cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-semibold bg-accent hover:bg-accent-hover text-on-accent transition-colors cursor-pointer"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
