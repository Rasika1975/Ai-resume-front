export default function TemplateCard({ template, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(template.id)}
      className={`cursor-pointer p-6 rounded-xl border-4 transition ${
        isSelected
          ? 'border-blue-600 bg-blue-50 shadow-lg'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="bg-white h-48 rounded-lg mb-4 flex items-center justify-center border">
        <p className="text-gray-400">Template Preview</p>
      </div>
      <h3 className="text-xl font-semibold text-center">{template.name}</h3>
    </div>
  );
}
