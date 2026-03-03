"use client";

import { Tag } from "@/src/types/tag/tag";
import { useState, useEffect } from "react";
import { loadTags } from "./actions/loadTags";
import { handleAddTag } from "./actions/handleAddTag";
import { handleUpdateTag } from "./actions/handleUpdateTag";
import { handleRemoveTag } from "./actions/handleRemoveTag";

export function useTagActions() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    loadTags(setTags, setLoading, setTotal, page, limit);
  }, [page]);

  return {
    tags,
    total,
    loading,
    page,
    setPage,
    limit,
    onAdd: (name: string) => handleAddTag(name, tags, setTags),
    onUpdate: (id: number, name: string) => handleUpdateTag(id, name, setTags),
    onRemove: (id: number) => handleRemoveTag(id, setTags),
  };
}
