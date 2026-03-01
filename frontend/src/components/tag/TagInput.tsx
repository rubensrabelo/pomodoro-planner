import { useState } from "react";

interface TagInputProps {
  onAddTag: (name: string) => void;
}


export function TagInput({ onAddTag }: TagInputProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onAddTag(name.trim());
      setName("");
    }
  };

  return (
    <div className="flex gap-2">
      <input 
        placeholder="Nova tag..."
        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />
      <button 
        onClick={handleSubmit}
        className="bg-gray-800 text-white px-4 rounded-lg hover:bg-black transition"
      >
        +
      </button>
    </div>
  );
}