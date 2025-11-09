import { Link } from 'react-router-dom';
import { Sparkles, FileCheck, Download, BarChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Build Your Perfect Resume with <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Create professional, ATS-friendly resumes in minutes using advanced AI technology.
          Stand out from the competition with optimized content and beautiful templates.
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Building Free
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Sparkles className="text-blue-600" size={40} />}
            title="AI-Powered Generation"
            description="Generate professional resume content using cutting-edge AI technology"
          />
          <FeatureCard
            icon={<FileCheck className="text-green-600" size={40} />}
            title="ATS Optimization"
            description="Ensure your resume passes Applicant Tracking Systems with high scores"
          />
          <FeatureCard
            icon={<Download className="text-purple-600" size={40} />}
            title="Multiple Templates"
            description="Choose from modern, minimal, corporate, and creative designs"
          />
          <FeatureCard
            icon={<BarChart className="text-orange-600" size={40} />}
            title="Resume Analyzer"
            description="Get detailed feedback and improvement suggestions instantly"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}