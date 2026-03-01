import { TagInput } from "./TagInput";
import { TagItem } from "./TagItem";

interface TagListProps {
  availableTags: string[];
  setAvailableTags: (tags: string[]) => void;
  setIsTagModalOpen: (open: boolean) => void;
}

export function TagList({ availableTags, setAvailableTags, setIsTagModalOpen }: TagListProps) {
  
  const handleAddTag = (name: string) => {
    if (!availableTags.includes(name)) {
      setAvailableTags([...availableTags, name]);
    }
  };

  const handleRemoveTag = (name: string) => {
    setAvailableTags(availableTags.filter(t => t !== name));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-xl font-bold text-gray-800">Minhas Tags</h2>
          <button onClick={() => setIsTagModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        <div className="space-y-4">
          <TagInput onAddTag={handleAddTag} />

          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {availableTags.map(tag => (
              <TagItem 
                key={tag} 
                label={tag} 
                onRemove={handleRemoveTag} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}