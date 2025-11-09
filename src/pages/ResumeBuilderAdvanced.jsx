import { useState } from 'react';
import { Download, Save, FileText, Briefcase, GraduationCap, Code, Plus, Trash2, Eye, MapPin, Mail, Phone, Linkedin, Globe, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ResumeBuilderAdvanced() {
  const [activeTab, setActiveTab] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    experience: [],
    education: [],
    skills: [],
    custom: []
  });

  // Update personal info
  const updatePersonal = (field, value) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [field]: value }
    });
  };

  // Add Experience
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        jobTitle: '',
        company: '',
        duration: '',
        description: ''
      }]
    });
  };

  // Update Experience
  const updateExperience = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    setResumeData({ ...resumeData, experience: updated });
  };

  // Delete Experience
  const deleteExperience = (index) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    });
  };

  // Add Education
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, {
        degree: '',
        school: '',
        year: '',
        details: ''
      }]
    });
  };

  // Update Education
  const updateEducation = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index][field] = value;
    setResumeData({ ...resumeData, education: updated });
  };

  // Delete Education
  const deleteEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    });
  };

  // Add Skill
  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, '']
    });
  };

  // Update Skill
  const updateSkill = (index, value) => {
    const updated = [...resumeData.skills];
    updated[index] = value;
    setResumeData({ ...resumeData, skills: updated });
  };

  // Delete Skill
  const deleteSkill = (index) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  // Add Custom Section
  const addCustom = () => {
    setResumeData({
      ...resumeData,
      custom: [...resumeData.custom, { title: '', content: '' }]
    });
  };

  // Update Custom
  const updateCustom = (index, field, value) => {
    const updated = [...resumeData.custom];
    updated[index][field] = value;
    setResumeData({ ...resumeData, custom: updated });
  };

  // Delete Custom
  const deleteCustom = (index) => {
    setResumeData({
      ...resumeData,
      custom: resumeData.custom.filter((_, i) => i !== index)
    });
  };

  // Download PDF (placeholder - you'll connect to backend)
  const downloadPDF = () => {
    alert('PDF Download will be implemented with backend');
  };

  // Save Resume
  const saveResume = () => {
    alert('Resume saved! (Connect to backend API)');
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'custom', label: 'Custom', icon: Plus },
    { id: 'preview', label: 'Preview', icon: Eye }
  ];

  const navigateTabs = (direction) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < tabs.length) {
      setActiveTab(tabs[nextIndex].id);
    }
  };

  const renderNavigationButtons = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === tabs.length - 1;

    if (isLast) return null; // Don't show on Preview tab

    return (
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigateTabs(-1)}
          disabled={isFirst}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} />
          Previous
        </button>
        <button
          onClick={() => navigateTabs(1)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
          <ArrowRight size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Build Your ATS-Optimized Resume</h2>
          <div className="flex gap-3">
             <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
               <span>Change Template</span>
             </button>
             <button
               onClick={saveResume}
               className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
             >
               <Save size={18} />
               Save
             </button>
             <button
               onClick={downloadPDF}
               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
             >
               <Download size={18} />
               Download
             </button>
           </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Personal Information */}
            {activeTab === 'personal' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resumeData.personal.fullName}
                      onChange={(e) => updatePersonal('fullName', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resumeData.personal.email}
                      onChange={(e) => updatePersonal('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Phone *</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resumeData.personal.phone}
                      onChange={(e) => updatePersonal('phone', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="City, State, ZIP"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resumeData.personal.location}
                      onChange={(e) => updatePersonal('location', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">LinkedIn (Optional)</label>
                    <input
                      type="text"
                      placeholder="linkedin.com/in/johndoe"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resumeData.personal.linkedin}
                      onChange={(e) => updatePersonal('linkedin', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Personal Website (Optional)</label>
                    <input
                      type="text"
                      placeholder="johndoe.com"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resumeData.personal.website}
                      onChange={(e) => updatePersonal('website', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-1">ATS Tip:</p>
                  <p className="text-sm text-blue-800">
                    Use a professional email address, and make sure your contact information is up-to-date and easily readable. 
                    Including a LinkedIn profile can increase your ATS score.
                  </p>
                </div>

                {renderNavigationButtons()}
              </div>
            )}

            {/* Experience */}
            {activeTab === 'experience' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Work Experience</h3>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={18} />
                    Add Experience
                  </button>
                </div>

                {resumeData.experience.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No experience added yet. Click "Add Experience" to start.</p>
                ) : (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <button
                          onClick={() => deleteExperience(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Job Title"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Duration (e.g., Jan 2020 - Present)"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={exp.duration}
                            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                          />
                          <textarea
                            rows="4"
                            placeholder="Job description and achievements..."
                            className="w-full px-4 py-2 border rounded-lg"
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {renderNavigationButtons()}
              </div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Education</h3>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={18} />
                    Add Education
                  </button>
                </div>

                {resumeData.education.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No education added yet. Click "Add Education" to start.</p>
                ) : (
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <button
                          onClick={() => deleteEducation(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Degree (e.g., Bachelor of Computer Science)"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="School/University Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={edu.school}
                            onChange={(e) => updateEducation(index, 'school', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Year (e.g., 2018 - 2022)"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={edu.year}
                            onChange={(e) => updateEducation(index, 'year', e.target.value)}
                          />
                          <textarea
                            rows="2"
                            placeholder="Additional details (optional)"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={edu.details}
                            onChange={(e) => updateEducation(index, 'details', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {renderNavigationButtons()}
              </div>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Technical Skills</h3>
                  <button
                    onClick={addSkill}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={18} />
                    Add Skill
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Add skills relevant to the job you are applying for. Use specific technical terms.
                </p>

                {resumeData.skills.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No skills added yet.</p>
                ) : (
                  <div className="space-y-3">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g., React.js, Node.js, MongoDB"
                          className="flex-1 px-4 py-2 border rounded-lg"
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                        />
                        <button
                          onClick={() => deleteSkill(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {renderNavigationButtons()}
              </div>
            )}

            {/* Custom Sections */}
            {activeTab === 'custom' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Custom Sections</h3>
                  <button
                    onClick={addCustom}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={18} />
                    Add Section
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Add custom sections like Certifications, Awards, Languages, etc.
                </p>

                {resumeData.custom.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No custom sections added yet.</p>
                ) : (
                  <div className="space-y-6">
                    {resumeData.custom.map((section, index) => (
                      <div key={index} className="border rounded-lg p-4 relative">
                        <button
                          onClick={() => deleteCustom(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Section Title (e.g., Certifications)"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={section.title}
                            onChange={(e) => updateCustom(index, 'title', e.target.value)}
                          />
                          <textarea
                            rows="4"
                            placeholder="Section content..."
                            className="w-full px-4 py-2 border rounded-lg"
                            value={section.content}
                            onChange={(e) => updateCustom(index, 'content', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {renderNavigationButtons()}
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Resume Preview</h3>
                <p className="text-gray-600 mb-4">
                  Your resume preview is shown on the right. Click "Download" to export as PDF.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={downloadPDF}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={saveResume}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                  >
                    Save Resume
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 h-fit">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Eye className="text-blue-600" />
              Live Preview
            </h3>

            {!resumeData.personal.fullName ? (
              <div className="text-center py-12 text-gray-400">
                <FileText size={64} className="mx-auto mb-4" />
                <p>Fill in the form to see your resume preview here</p>
              </div>
            ) : (
              <div className="border rounded-lg p-8 bg-white space-y-6">
                {/* Personal */}
                <div className="pb-4 border-b">
                  <h1 className="text-3xl font-bold text-blue-700">{resumeData.personal.fullName}</h1>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-3">
                    {resumeData.personal.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={14} /> <span>{resumeData.personal.email}</span>
                      </div>
                    )}
                    {resumeData.personal.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} /> <span>{resumeData.personal.phone}</span>
                      </div>
                    )}
                    {resumeData.personal.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} /> <span>{resumeData.personal.location}</span>
                      </div>
                    )}
                    {resumeData.personal.linkedin && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <Linkedin size={14} /> <span>{resumeData.personal.linkedin}</span>
                      </div>
                    )}
                    {resumeData.personal.website && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <Globe size={14} /> <span>{resumeData.personal.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold mb-3 text-blue-700 border-b-2 border-blue-100 pb-1">EXPERIENCE</h2>
                    {resumeData.experience.map((exp, i) => (
                      <div key={i} className="mb-3">
                        <h3 className="font-semibold">{exp.jobTitle}</h3>
                        <p className="text-sm text-gray-600">{exp.company} | {exp.duration}</p>
                        <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold mb-3 text-blue-700 border-b-2 border-blue-100 pb-1">EDUCATION</h2>
                    {resumeData.education.map((edu, i) => (
                      <div key={i} className="mb-2">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.school} | {edu.year}</p>
                        {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold mb-3 text-blue-700 border-b-2 border-blue-100 pb-1">SKILLS</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.filter(s => s).map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Sections */}
                {resumeData.custom.length > 0 && resumeData.custom.map((section, i) => (
                  section.title && (
                    <div key={i}>
                      <h2 className="text-lg font-bold mb-3 text-blue-700 border-b-2 border-blue-100 pb-1">{section.title.toUpperCase()}</h2>
                      <p className="text-sm whitespace-pre-line">{section.content}</p>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}