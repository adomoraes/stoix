import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../contexts/AuthContext"
import { TaskForm } from "../components/TaskForm"
import { TaskItem } from "../components/TaskItem"
import api from "../services/api"

interface Task {
	id: number
	title: string
	description: string
	completed: boolean
}

export function TasksPage() {
	const { logout, user } = useAuth()
	const [tasks, setTasks] = useState<Task[]>([])
	const [loading, setLoading] = useState(true)
	const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
	const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null)
	const [updatedTaskId, setUpdatedTaskId] = useState<number | null>(null)

	const fetchTasks = useCallback(async () => {
		setLoading(true)
		try {
			const response = await api.get("/api/tasks")
			setTasks(response.data)
		} catch (error) {
			console.error("Failed to fetch tasks", error)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (user) {
			fetchTasks()
		}
	}, [user, fetchTasks])

	const handleTaskUpdate = async (
		id: number,
		data: { completed?: boolean; title?: string; description?: string }
	) => {
		const originalTasks = [...tasks]

		setTasks((currentTasks) =>
			currentTasks.map((task) => (task.id === id ? { ...task, ...data } : task))
		)

		try {
			await api.put(`/api/tasks/${id}`, data)

			if ("title" in data || "description" in data) {
				setUpdatedTaskId(id)
				setTimeout(() => setUpdatedTaskId(null), 1000)
			}
		} catch (error) {
			console.error("Failed to update task", error)
			setTasks(originalTasks)
		}
	}

	const handleDeleteRequested = (task: Task) => {
		setTaskToDelete(task)
	}
	const handleDeleteCancel = () => {
		setTaskToDelete(null)
	}

	const handleDeleteConfirmed = async () => {
		if (!taskToDelete) return

		setDeletingTaskId(taskToDelete.id)

		// Wait for animation
		setTimeout(async () => {
			try {
				await api.delete(`/api/tasks/${taskToDelete.id}`)
				setTasks((currentTasks) =>
					currentTasks.filter((t) => t.id !== taskToDelete.id)
				)
			} catch (error) {
				console.error("Failed to delete task", error)
			} finally {
				setTaskToDelete(null)
				setDeletingTaskId(null)
			}
		}, 500) // Duration of the animation
	}

	const pendingTasks = tasks.filter((task) => !task.completed)
	const completedTasks = tasks.filter((task) => task.completed)

	return (
		<>
			<div className='min-h-screen w-full bg-gradient-to-tr from-purple-700 via-pink-500 to-red-500 text-white p-4 sm:p-6 lg:p-8'>
				<header className='flex items-center justify-between mb-8'>
					<h1 className='text-4xl font-bold'>Minhas tarefas</h1>
					<button
						onClick={logout}
						className='px-4 py-2 text-sm font-bold text-purple-700 bg-white rounded-2xl transition-all duration-300 ease-in-out hover:bg-purple-100 hover:scale-105 active:scale-100'>
						Sair
					</button>
				</header>

				<main className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-1'>
						<TaskForm onTaskCreated={fetchTasks} />
					</div>
					<div className='lg:col-span-2'>
						<div className='p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg'>
							<h2 className='text-2xl font-bold text-white mb-6'>
								Lista de tarefas
							</h2>
							{loading ? (
								<p>Carregando tarefas...</p>
							) : (
								<div>
									<h3 className='text-lg font-bold text-white mb-4'>A fazer</h3>
									{pendingTasks.length === 0 ? (
										<p className='text-center text-white/80'>
											Parabéns você está em dia com suas tarefas.
										</p>
									) : (
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{pendingTasks.map((task) => (
												<TaskItem
													key={task.id}
													task={task}
													onTaskUpdated={handleTaskUpdate}
													onDeleteRequested={handleDeleteRequested}
													isDeleting={deletingTaskId === task.id}
													isJustUpdated={updatedTaskId === task.id}
												/>
											))}
										</div>
									)}

									{completedTasks.length > 0 && (
										<>
											<h3 className='text-lg font-bold text-white mt-8 mb-4'>
												Concluídas
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
												{completedTasks.map((task) => (
													<TaskItem
														key={task.id}
														task={task}
														onTaskUpdated={handleTaskUpdate}
														onDeleteRequested={handleDeleteRequested}
														isDeleting={deletingTaskId === task.id}
														isJustUpdated={updatedTaskId === task.id}
													/>
												))}
											</div>
										</>
									)}
								</div>
							)}
						</div>
					</div>
				</main>
			</div>

			{/* Confirmation Modal */}
			{taskToDelete && (
				<div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
					<div className='p-8 bg-gray-800 rounded-3xl shadow-lg text-white max-w-sm mx-4'>
						<h3 className='text-xl font-bold mb-4'>Confirmação de exclusão</h3>
						<p className='text-white/80 mb-6'>
							Tem certeza que deseja excluir a tarefa: "{taskToDelete.title}"?
							Esta ação não tem volta.
						</p>
						<div className='flex justify-end gap-x-4'>
							<button
								onClick={handleDeleteCancel}
								className='px-6 py-2 font-medium rounded-xl bg-gray-200 text-gray-800 transition-all duration-300 ease-in-out hover:bg-gray-300 hover:scale-105 active:scale-100'>
								Cancelar
							</button>
							<button
								onClick={handleDeleteConfirmed}
								className='px-6 py-2 font-bold text-white bg-red-500 rounded-xl transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105 active:scale-100'>
								Apagar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
