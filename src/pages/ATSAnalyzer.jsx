import { useState } from 'react';
import { analyzeResume } from '../services/api';
import { Upload, Loader2, FileCheck, AlertCircle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function ATSAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    // Validation
    if (!file) {
      setError('Please upload a resume PDF');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter job description');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      console.log('📤 Sending ATS analysis request...');
      const response = await analyzeResume(formData);
      console.log('✅ Analysis complete:', response.data);
      setResult(response.data);
    } catch (err) {
      console.error('❌ Analysis error:', err);
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return { icon: CheckCircle, text: 'Excellent Match!', color: 'text-green-600' };
    if (score >= 60) return { icon: TrendingUp, text: 'Good Match', color: 'text-yellow-600' };
    return { icon: AlertCircle, text: 'Needs Improvement', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ATS Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Check how well your resume matches the job requirements
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Get instant feedback and AI-powered suggestions
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-red-800">Error</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* File Upload */}
            <div>
              <label className="block mb-3 font-semibold text-gray-800 text-lg">
                Upload Resume (PDF) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {file ? (
                    <div className="space-y-3">
                      <CheckCircle className="mx-auto text-green-600" size={56} />
                      <div>
                        <p className="text-green-700 font-bold text-lg">{file.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="mx-auto text-blue-600" size={56} />
                      <div>
                        <p className="text-gray-800 font-semibold text-lg mb-1">
                          Click to upload
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF only, max 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block mb-3 font-semibold text-gray-800 text-lg">
                Job Description *
              </label>
              <textarea
                rows="10"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="Paste the complete job description here...

Example:
We are looking for a Full Stack Developer with:
- 3+ years experience with React and Node.js
- Strong knowledge of MongoDB and REST APIs
- Experience with Docker and AWS
- Excellent communication skills"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">
                  {jobDescription.length} characters
                </p>
                <p className="text-sm text-gray-500">
                  {jobDescription.split(/\s+/).filter(w => w).length} words
                </p>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !file || !jobDescription.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Analyzing Your Resume...
              </>
            ) : (
              <>
                <FileCheck size={24} />
                Analyze Resume
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            {/* Score Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">ATS Score</h2>
                <div className="flex items-center gap-2">
                  {(() => {
                    const { icon: Icon, text, color } = getScoreMessage(result.atsScore);
                    return (
                      <>
                        <Icon className={color} size={28} />
                        <span className={`font-semibold ${color}`}>{text}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className={`text-6xl font-black ${getScoreColor(result.atsScore)}`}>
                  {result.atsScore}%
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className={`${getScoreBgColor(result.atsScore)} h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                      style={{ width: `${result.atsScore}%` }}
                    >
                      <span className="text-white text-xs font-bold">
                        {result.atsScore}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {result.summary || `Your resume matches ${result.atsScore}% of the job requirements`}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Found Skills */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="text-green-600" size={24} />
                  <h3 className="text-xl font-bold text-green-800">
                    Found Skills ({result.foundSkills?.length || 0})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.foundSkills && result.foundSkills.length > 0 ? (
                    result.foundSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-semibold border border-green-300"
                      >
                        ✓ {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-green-700">No matching skills found</p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="text-red-600" size={24} />
                  <h3 className="text-xl font-bold text-red-800">
                    Missing Skills ({result.missingSkills?.length || 0})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills && result.missingSkills.length > 0 ? (
                    result.missingSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-800 px-3 py-2 rounded-full text-sm font-semibold border border-red-300"
                      >
                        ✗ {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-red-700">Great! No missing skills</p>
                  )}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-purple-800">
                  Improvement Suggestions
                </h3>
              </div>
              <div className="space-y-3">
                {result.suggestions && Array.isArray(result.suggestions) ? (
                  result.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 whitespace-pre-line bg-white p-4 rounded-lg">
                    {result.suggestions || 'No specific suggestions available'}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  setResult(null);
                  setFile(null);
                  setJobDescription('');
                  setError('');
                }}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Analyze Another Resume
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Print Results
              </button>
            </div>
          </div>
        )}

        {/* Tips Section */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">💡 ATS Tips</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Use exact keywords from the job description in your resume</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include both acronyms and full forms (e.g., "AI" and "Artificial Intelligence")</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Use standard section headings like "Work Experience" and "Education"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Avoid images, tables, and complex formatting in your PDF</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Quantify achievements with numbers and metrics</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}