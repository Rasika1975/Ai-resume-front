import { useState } from 'react';
import { analyzeResume } from '../services/api';
import { Upload, Loader2, FileCheck } from 'lucide-react';

export default function ATSAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file || !jobDescription) {
      alert('Please upload resume and enter job description');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    setLoading(true);
    try {
      const response = await analyzeResume(formData);
      setResult(response.data);
    } catch (error) {
      alert('Analysis failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">ATS Resume Analyzer</h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Upload Resume (PDF)</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto mb-2 text-blue-600" size={48} />
                <p className="text-gray-600">
                  {file ? file.name : 'Click to upload resume'}
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Job Description</label>
            <textarea
              rows="6"
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <FileCheck size={20} />
                Analyze Resume
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">ATS Score</span>
                <span className="text-3xl font-bold text-blue-600">{result.atsScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${result.atsScore}%` }}
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Found Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.foundSkills?.map((skill, i) => (
                  <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-red-600">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map((skill, i) => (
                  <span key={i} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">AI Suggestions</h3>
              <p className="text-gray-700 whitespace-pre-line">{result.suggestions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}