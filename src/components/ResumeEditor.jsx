import { useState } from 'react';

export default function ResumeEditor({ initialData, onSave }) {
  const [data, setData] = useState(initialData);

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold mb-2">Summary</label>
        <textarea
          rows="4"
          className="w-full px-4 py-3 border rounded-lg"
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Skills</label>
        <input
          type="text"
          className="w-full px-4 py-3 border rounded-lg"
          placeholder="Comma separated"
          value={Array.isArray(data.skills) ? data.skills.join(', ') : data.skills}
          onChange={(e) => handleChange('skills', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Experience</label>
        <textarea
          rows="6"
          className="w-full px-4 py-3 border rounded-lg"
          value={data.experience}
          onChange={(e) => handleChange('experience', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Projects</label>
        <textarea
          rows="6"
          className="w-full px-4 py-3 border rounded-lg"
          value={data.projects}
          onChange={(e) => handleChange('projects', e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Education</label>
        <textarea
          rows="4"
          className="w-full px-4 py-3 border rounded-lg"
          value={data.education}
          onChange={(e) => handleChange('education', e.target.value)}
        />
      </div>

      <button
        onClick={() => onSave(data)}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
}