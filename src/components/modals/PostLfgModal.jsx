import React, { useState } from 'react';
import { X } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-lg border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#131315] p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#d6dae1] dark:border-[#292f42]">
          <div>
            <h3 className="font-bold text-base text-[#18181b] dark:text-[#ededef]">
              Create Team Finder Listing
            </h3>
            <p className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-0.5">
              Connect with classmates or recruit for upcoming competitions
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded border border-[#d6dae1] dark:border-[#292f42] hover:bg-[#f3f3f5] dark:hover:bg-[#18181c] text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {/* Post Type Selector */}
          <div>
            <label className="block text-[#18181b] dark:text-[#ededef] mb-1 font-semibold">
              Listing Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Looking for Squad' })}
                className={`py-1.5 px-3 rounded border text-center font-medium transition-colors cursor-pointer ${
                  formData.type === 'Looking for Squad'
                    ? 'border-[#00966e] bg-[#00966e]/10 text-[#00966e]'
                    : 'border-[#d6dae1] dark:border-[#292f42] text-[#64646e] dark:text-[#8a8a93]'
                }`}
              >
                Looking for Squad
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'Squad Recruiting' })}
                className={`py-1.5 px-3 rounded border text-center font-medium transition-colors cursor-pointer ${
                  formData.type === 'Squad Recruiting'
                    ? 'border-[#00966e] bg-[#00966e]/10 text-[#00966e]'
                    : 'border-[#d6dae1] dark:border-[#292f42] text-[#64646e] dark:text-[#8a8a93]'
                }`}
              >
                Squad Recruiting
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#18181b] dark:text-[#ededef] mb-1 font-semibold">
                {formData.type === 'Squad Recruiting' ? 'Squad Name *' : 'Handle / Name *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Stefan_TU"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5] dark:bg-[#131620] text-[#18181b] dark:text-[#ededef] focus:outline-none focus:border-[#00966e]"
              />
            </div>

            <div>
              <label className="block text-[#18181b] dark:text-[#ededef] mb-1 font-semibold">
                Discord Handle *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. stefan#1234"
                value={formData.discordHandle}
                onChange={(e) => setFormData({ ...formData, discordHandle: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5] dark:bg-[#131620] text-[#18181b] dark:text-[#ededef] font-mono focus:outline-none focus:border-[#00966e]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#18181b] dark:text-[#ededef] mb-1 font-semibold">
                University or Affiliation
              </label>
              <input
                type="text"
                placeholder="e.g. TU Sofia, 2nd yr"
                value={formData.affiliation}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5] dark:bg-[#131620] text-[#18181b] dark:text-[#ededef] focus:outline-none focus:border-[#00966e]"
              />
            </div>

            <div>
              <label className="block text-[#18181b] dark:text-[#ededef] mb-1 font-semibold">
                Discipline Focus
              </label>
              <input
                type="text"
                placeholder="e.g. Web, Crypto, Pwn"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5] dark:bg-[#131620] text-[#18181b] dark:text-[#ededef] focus:outline-none focus:border-[#00966e]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#18181b] dark:text-[#ededef] mb-1 font-semibold">
              Target Event
            </label>
            <input
              type="text"
              placeholder="e.g. Security BSides Sofia 2027"
              value={formData.targetEvent}
              onChange={(e) => setFormData({ ...formData, targetEvent: e.target.value })}
              className="w-full px-3 py-2 rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5] dark:bg-[#131620] text-[#18181b] dark:text-[#ededef] focus:outline-none focus:border-[#00966e]"
            />
          </div>

          <div>
            <label className="block text-[#18181b] dark:text-[#ededef] mb-1 font-semibold">
              Listing Description
            </label>
            <textarea
              rows={2}
              required
              placeholder="Describe challenges you practice or what you need from teammates..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5] dark:bg-[#131620] text-[#18181b] dark:text-[#ededef] focus:outline-none focus:border-[#00966e]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded border border-[#d6dae1] dark:border-[#292f42] text-[#64646e] dark:text-[#8a8a93] hover:bg-[#f3f3f5] dark:hover:bg-[#18181c] cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded font-semibold bg-[#00966e] hover:bg-[#00825f] text-white shadow-xs transition-colors cursor-pointer"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
