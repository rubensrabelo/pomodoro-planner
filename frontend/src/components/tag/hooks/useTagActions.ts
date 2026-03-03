"use client";

import { Tag } from "@/src/types/tag/tag";
import { useState, useEffect } from "react";
import { loadTags } from "./actions/loadTags";
import { handleAddTag } from "./actions/handleAddTag";
import { handleUpdateTag } from "./actions/handleUpdateTag";
import { handleRemoveTag } from "./actions/handleRemoveTag";

export function useTagActions() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTags(setTags, setLoading);
  }, []);

  return {
    tags,
    loading,
    onAdd: (name: string) => handleAddTag(name, tags, setTags),
    onUpdate: (id: number, name: string) => handleUpdateTag(id, name, setTags),
    onRemove: (id: number) => handleRemoveTag(id, setTags),
  };
}