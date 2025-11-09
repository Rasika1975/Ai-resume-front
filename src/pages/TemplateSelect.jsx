import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern', color: 'blue' },
  { id: 'minimal', name: 'Minimal', color: 'gray' },
  { id: 'corporate', name: 'Corporate', color: 'indigo' },
  { id: 'creative', name: 'Creative', color: 'purple' },
];

export default function TemplateSelect() {
  const [selected, setSelected] = useState('modern');
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('selectedTemplate', selected);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Template</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelected(template.id)}
              className={`cursor-pointer p-6 rounded-xl border-4 transition ${
                selected === template.id
                  ? `border-${template.color}-600 bg-${template.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FileText className={`mx-auto mb-4 text-${template.color}-600`} size={64} />
              <h3 className="text-xl font-semibold text-center">{template.name}</h3>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full max-w-md mx-auto block bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Continue with {templates.find(t => t.id === selected)?.name} Template
        </button>
      </div>
    </div>
  );
}

