import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateResume, saveResume } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ResumeBuilder() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    skills: '',
    experience: '',
    projects: '',
    education: '',
    jobRole: ''
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await generateResume(formData);
      setGeneratedResume(response.data);
    } catch (error) {
      alert('Failed to generate resume');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await saveResume({
        userId: user._id,
        title: `${formData.jobRole} Resume`,
        ...generatedResume
      });
      alert('Resume saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to save resume');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Resume Builder</h1>

        <div className="space-y-4">
          <input
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            placeholder="Job Role (e.g., Frontend Developer)"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.jobRole}
            onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
          />
          <textarea
            placeholder="Skills (comma separated)"
            rows="3"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
          <textarea
            placeholder="Experience (describe your work experience)"
            rows="4"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          />
          <textarea
            placeholder="Projects (describe your key projects)"
            rows="4"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.projects}
            onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
          />
          <textarea
            placeholder="Education"
            rows="3"
            className="w-full px-4 py-3 border rounded-lg"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              'Generate Resume with AI'
            )}
          </button>
        </div>

        {generatedResume && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Generated Resume</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Summary</h3>
                <p className="text-gray-700">{generatedResume.summary}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Skills</h3>
                <p className="text-gray-700">{Array.isArray(generatedResume.skills) ? generatedResume.skills.join(', ') : generatedResume.skills}</p>
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Save Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}