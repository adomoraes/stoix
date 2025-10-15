import React, { useState, useEffect } from "react"

interface Task {
	id: number
	title: string
	description: string
	completed: boolean
}

interface TaskItemProps {
	task: Task
	onTaskUpdated: (
		id: number,
		data: { completed?: boolean; title?: string; description?: string }
	) => void
	onDeleteRequested: (task: Task) => void
	isDeleting: boolean
	isJustUpdated: boolean
}

export function TaskItem({
	task,
	onTaskUpdated,
	onDeleteRequested,
	isDeleting,
	isJustUpdated,
}: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTitle, setEditedTitle] = useState(task.title)
	const [editedDescription, setEditedDescription] = useState(task.description)

	useEffect(() => {
		setEditedTitle(task.title)
		setEditedDescription(task.description)
	}, [task.title, task.description])

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onTaskUpdated(task.id, { completed: e.target.checked })
	}

	const handleEditClick = () => {
		if (!task.completed) {
			setIsEditing(true)
		}
	}

	const handleCancelClick = () => {
		setIsEditing(false)
		setEditedTitle(task.title)
		setEditedDescription(task.description)
	}

	const handleSaveClick = () => {
		onTaskUpdated(task.id, {
			title: editedTitle,
			description: editedDescription,
		})
		setIsEditing(false)
	}

	const animationClasses = isDeleting
		? "opacity-0 -translate-y-full scale-50"
		: "opacity-100 translate-y-0 scale-100"

	const magicAnimationClass = isJustUpdated ? "animate-magic-flash" : ""

	return (
		<div
			className={`p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg flex flex-col justify-between transition-all duration-500 ease-in-out ${animationClasses} ${magicAnimationClass} ${task.completed ? 'opacity-50' : ''}`}>
			{isEditing ? (
				<>
					<div>
						<input
							type='text'
							value={editedTitle}
							onChange={(e) => setEditedTitle(e.target.value)}
							className='w-full px-2 py-1 mb-2 text-xl font-bold text-white bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent'
						/>
						<textarea
							value={editedDescription}
							onChange={(e) => setEditedDescription(e.target.value)}
							rows={3}
							className='w-full px-2 py-1 text-white/80 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent'
						/>
					</div>
					<div className='flex items-center justify-end gap-x-4 mt-6'>
						<button
							onClick={handleCancelClick}
							className='flex items-center gap-x-2 p-2 text-sm font-medium rounded-full bg-gray-500 text-white transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 active:scale-100'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
						<button
							onClick={handleSaveClick}
							className='flex items-center gap-x-2 p-2 text-sm font-bold rounded-full bg-green-500 text-white transition-all duration-300 ease-in-out hover:bg-green-600 hover:scale-105 active:scale-100'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 13l4 4L19 7'
								/>
							</svg>
						</button>
					</div>
				</>
			) : (
				<>
					<div>
						<div className='flex items-center justify-between mb-4'>
							<h3 className={`text-xl font-bold text-white ${task.completed ? 'line-through' : ''}`}>
								{task.title}
							</h3>
							<input
								type='checkbox'
								checked={task.completed}
								onChange={handleCheckboxChange}
								className='form-checkbox h-6 w-6 text-purple-500 bg-white/20 border-transparent rounded-md focus:ring-0 cursor-pointer'
							/>
						</div>
						<p className={`text-white/80 ${task.completed ? 'line-through' : ''}`}>
							{task.description}
						</p>
					</div>
					<div className='flex items-center justify-end gap-x-4 mt-6'>
						{!task.completed && (
							<button
								onClick={handleEditClick}
								className='p-2 rounded-full text-white transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 hover:scale-105 active:scale-100'>
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
										d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z'
									/>
								</svg>
							</button>
						)}
						<button
							onClick={() => onDeleteRequested(task)}
							className='p-2 rounded-full transition-all duration-300 ease-in-out bg-pink-400 text-white hover:bg-pink-500 hover:scale-110 active:scale-100'>
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
									d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
								/>
							</svg>
						</button>
					</div>
				</>
			)}
		</div>
	)
}
