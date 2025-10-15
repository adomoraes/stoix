import React, { useState } from "react"
import api from "../services/api"

interface TaskFormProps {
	onTaskCreated: () => void // Callback to refresh the list
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		if (!title) {
			setError("Título obrigatório")
			return
		}

		try {
			await api.post("/api/tasks", { title, description })
			setTitle("")
			setDescription("")
			onTaskCreated() // Trigger the callback
		} catch (err) {
			setError("Failed to create task. Please try again.")
			console.error(err)
		}
	}

	return (
		<div className='p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg'>
			<h2 className='text-2xl font-bold text-white mb-6'>Criar nova tarefa</h2>
			<form onSubmit={handleSubmit}>
				{error && (
					<div className='bg-red-500/50 text-white p-3 rounded-lg mb-4 text-center'>
						{error}
					</div>
				)}
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-white text-sm font-bold mb-2'>
						Título
					</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='w-full px-4 py-3 bg-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent placeholder-white'
						placeholder='Exemplo: Fazer compras'
					/>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='description'
						className='block text-white text-sm font-bold mb-2'>
						Descrição
					</label>
					<textarea
						id='description'
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full px-4 py-3 bg-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent placeholder-white'
						placeholder='Descrever a tarefa detalhadamente...'></textarea>
				</div>
				<div className='flex justify-center'>
					<button
						type='submit'
						className='w-auto flex items-center gap-x-2 px-4 py-3 text-lg font-bold text-white bg-purple-500 hover:bg-purple-600 rounded-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-100'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 4v16m8-8H4'
							/>
						</svg>
						Incluir Tarefa
					</button>
				</div>{" "}
			</form>
		</div>
	)
}
