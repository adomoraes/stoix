import React from 'react';

export function TaskForm() {
  return (
    <div className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Create a New Task</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-3 bg-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent"
            placeholder="e.g., Learn Tailwind CSS"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-white text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-4 py-3 bg-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent"
            placeholder="Describe the task in more detail..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl hover:opacity-90 transition-opacity"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
