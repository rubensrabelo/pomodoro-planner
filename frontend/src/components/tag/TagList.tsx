"use client";

import { TagInput } from "./TagInput";
import { TagItem } from "./TagItem";
import { useTagActions } from "./hooks/useTagActions";

export function TagList({ setIsTagModalOpen }: { setIsTagModalOpen: (o: boolean) => void }) {
  const { tags, loading, onAdd, onUpdate, onRemove } = useTagActions();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <header className="flex justify-between mb-4 items-center">
          <h2 className="text-xl font-bold text-gray-800">Minhas Tags</h2>
          <button onClick={() => setIsTagModalOpen(false)}>✕</button>
        </header>
        
        <div className="space-y-4">
          <TagInput onAddTag={onAdd} />

          {loading ? (
            <div className="py-10 text-center italic text-gray-400">Carregando...</div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {tags.length > 0 ? (
                tags.map(tag => (
                  <TagItem 
                    key={tag.id} 
                    tag={tag} 
                    onRemove={() => onRemove(tag.id)} 
                    onUpdate={(name) => onUpdate(tag.id, name)}
                  />
                ))
              ) : (
                <div className="w-full py-8 text-center">
                  <p className="text-gray-500 text-sm italic">Nenhuma tag cadastrada.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}