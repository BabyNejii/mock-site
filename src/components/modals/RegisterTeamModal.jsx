import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import FormField from './FormField';

export default function RegisterTeamModal({ isOpen, onClose, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    affiliation: 'Technical University of Sofia',
    captain: '',
    ctftimeId: '',
    specialty: 'Web Exploitation',
    bio: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.captain) return;

    setSubmitted(true);
    setTimeout(() => {
      onRegisterSuccess({
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        rank: 5,
        name: formData.name,
        country: 'Bulgaria',
        affiliation: formData.affiliation,
        ctftimeId: Number(formData.ctftimeId) || Math.floor(Math.random() * 50000 + 100000),
        points2024: 0.00,
        eventsPlayed2024: 0,
        globalRank: 1200,
        captain: formData.captain,
        specialties: [formData.specialty],
        badges: ['New Team', 'Bulgarian Registry'],
        recentAchievements: ['Registered on ctf.bg'],
        bio: formData.bio || 'New collegiate or community squad registered in the Bulgarian CTF directory.'
      });
      setSubmitted(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border-default bg-elevated p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-divide">
          <div>
            <h3 className="font-display text-xl font-bold text-strong">
              Register Bulgarian CTF Squad
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Add your university or community team to the directory
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

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-accent" />
            <h4 className="font-bold text-base text-strong">
              Squad Registered
            </h4>
            <p className="text-xs text-muted max-w-xs">
              Your squad has been added to the Bulgarian national registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <FormField
              label="Squad Name *"
              required
              placeholder="e.g. TU Sofia CyberSquad"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Captain Handle *"
                required
                placeholder="e.g. 0xIvan"
                value={formData.captain}
                onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
              />
              <FormField
                label="CTFtime ID (Optional)"
                type="number"
                mono
                placeholder="e.g. 194263"
                value={formData.ctftimeId}
                onChange={(e) => setFormData({ ...formData, ctftimeId: e.target.value })}
              />
            </div>

            <FormField
              label="University or Affiliation"
              type="select"
              value={formData.affiliation}
              onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
            >
              <option value="Technical University of Sofia">Technical University of Sofia (TU Sofia)</option>
              <option value="Sofia University (FMI)">Sofia University St. Kliment Ohridski (FMI)</option>
              <option value="University of National and World Economy (UNWE)">University of National and World Economy (UNWE)</option>
              <option value="New Bulgarian University (NBU)">New Bulgarian University (NBU)</option>
              <option value="Paisii Hilendarski University of Plovdiv">Paisii Hilendarski University of Plovdiv</option>
              <option value="Independent Community Team">Independent Community Team</option>
            </FormField>

            <FormField
              label="Primary Specialty"
              type="select"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            >
              <option value="Web Exploitation">Web Exploitation</option>
              <option value="Binary Exploitation (Pwn)">Binary Exploitation (Pwn)</option>
              <option value="Reverse Engineering">Reverse Engineering</option>
              <option value="Cryptography">Cryptography</option>
              <option value="Digital Forensics">Digital Forensics</option>
            </FormField>

            <FormField
              label="Team Description"
              type="textarea"
              rows={2}
              placeholder="Briefly describe your squad and target CTFs..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                Register Squad
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
