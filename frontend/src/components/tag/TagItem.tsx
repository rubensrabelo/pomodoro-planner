"use client";
import { useState } from "react";
import { Tag } from "@/src/types/tag/tag";

interface TagItemProps {
  tag: Tag;
  onRemove: () => void;
  onUpdate: (newName: string) => void;
}

export function TagItem({ tag, onRemove, onUpdate }: TagItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(tag.name);

  const handleBlur = () => {
    if (editValue.trim() && editValue !== tag.name) {
      onUpdate(editValue.trim());
    } else {
      setEditValue(tag.name);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1 gap-2 transition-all hover:border-gray-300">
      {isEditing ? (
        <input
          autoFocus
          className="bg-transparent outline-none text-sm w-16 text-gray-700"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
        />
      ) : (
        <span 
          className="text-sm text-gray-700 cursor-pointer" 
          onDoubleClick={() => setIsEditing(true)}
          title="Clique duplo para editar"
        >
          {tag.name}
        </span>
      )}
      <button 
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 font-bold text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}