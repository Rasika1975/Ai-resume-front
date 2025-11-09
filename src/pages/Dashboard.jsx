import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUserResumes, deleteResume } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FileText, Trash2, Plus } from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await getUserResumes(user._id);
      setResumes(response.data);
    } catch (error) {
      console.error('Failed to fetch resumes');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this resume?')) {
      try {
        await deleteResume(id);
        fetchResumes();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Resumes</h1>
          <Link
            to="/builder"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            <Plus size={20} />
            Create New
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-4">No resumes yet</p>
            <Link to="/builder" className="text-blue-600 font-semibold">Create your first resume</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-2">{resume.title}</h3>
                <p className="text-gray-600 mb-4">
                  Created: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}