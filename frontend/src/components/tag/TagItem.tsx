interface TagItemProps {
  label: string;
  onRemove: (label: string) => void;
}

export function TagItem({ label, onRemove }: TagItemProps) {
  return (
    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2 group">
      {label}
      <button 
        onClick={() => onRemove(label)}
        className="text-red-400 hover:text-red-600 transition-colors font-bold"
        aria-label={`Remover tag ${label}`}
      >
        ×
      </button>
    </span>
  );
}