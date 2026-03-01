"use client";

import { useState } from "react";
import { Task } from "../types/task/Task";
import { TaskList } from "../components/task/TaskList";
import { TagList } from "../components/tag/TagList";
import { TaskCreate } from "../components/task/TaskCreate";
import { TaskHeader } from "../components/task/TaskHeader";

export default function PomoPlannerHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(["Trabalho", "Estudo", "Saúde"]);
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    setIsTaskModalOpen(false);
  };

  const addPomodoro = (taskId: number) => {
    setTasks(tasks.map(t =>
      t.id === taskId && t.completedPomodoros < t.estimatedPomodoros
        ? { ...t, completedPomodoros: t.completedPomodoros + 1 }
        : t
    ));
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-gray-50/30">
      
      <TaskHeader 
        onOpenTags={() => setIsTagModalOpen(true)} 
        onOpenNewTask={() => setIsTaskModalOpen(true)} 
      />

      <TaskList 
        tasks={tasks} 
        onAddPomodoro={addPomodoro} 
      />

      {isTaskModalOpen && (
        <TaskCreate 
          availableTags={availableTags} 
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleAddTask}
        />
      )}

      {isTagModalOpen && (
        <TagList
          availableTags={availableTags}
          setAvailableTags={setAvailableTags}
          setIsTagModalOpen={setIsTagModalOpen}
        />
      )}
    </main>
  );
}