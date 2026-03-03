"use client";

import { TagInput } from "./TagInput";
import { TagItem } from "./TagItem";
import { useTagActions } from "./hooks/useTagActions";

export function TagList({ setIsTagModalOpen }: { setIsTagModalOpen: (o: boolean) => void }) {
  const { tags, loading, total, page, setPage, limit, onAdd, onUpdate, onRemove } = useTagActions();
  
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl flex flex-col min-h-125">
        <header className="flex justify-between mb-4 items-center">
          <h2 className="text-xl font-bold text-gray-800">Minhas Tags</h2>
          <button 
            onClick={() => setIsTagModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 font-bold p-1"
          >
            ✕
          </button>
        </header>
        
        <div className="space-y-4 flex-1 flex flex-col">
          <TagInput onAddTag={onAdd} />

          {loading ? (
            <div className="py-10 text-center italic text-gray-400">Carregando...</div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {tags.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {tags.map(tag => (
                    <TagItem 
                      key={tag.id} 
                      tag={tag} 
                      onRemove={() => onRemove(tag.id)} 
                      onUpdate={(name) => onUpdate(tag.id, name)}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full py-8 text-center">
                  <p className="text-gray-500 text-sm italic">Nenhuma tag cadastrada.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Paginação Fixa no Rodapé */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <button 
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="text-sm font-bold text-gray-500 disabled:opacity-20 hover:text-red-600 transition-colors"
            >
              ← Anterior
            </button>
            <span className="text-xs text-gray-400 font-bold bg-gray-50 px-3 py-1 rounded-full">
              {page} / {totalPages}
            </span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="text-sm font-bold text-gray-500 disabled:opacity-20 hover:text-red-600 transition-colors"
            >
              Próxima →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}