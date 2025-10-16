import { useState, useEffect, useCallback, useMemo } from "react"
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

type FilterType = "all" | "pending" | "completed"

export function TasksPage() {
	const { logout, user } = useAuth()
	const [tasks, setTasks] = useState<Task[]>([])
	const [loading, setLoading] = useState(true)
	const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
	const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null)
	const [updatedTaskId, setUpdatedTaskId] = useState<number | null>(null)
	const [activeFilter, setActiveFilter] = useState<FilterType>("all")
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
	const [filterLoading, setFilterLoading] = useState(false)
	const [isFormVisibleOnMobile, setIsFormVisibleOnMobile] = useState(false)

	// Calcula as contagens de tarefas de forma otimizada
	const pendingCount = useMemo(
		() => tasks.filter((task) => !task.completed).length,
		[tasks]
	)
	const completedCount = useMemo(
		() => tasks.filter((task) => task.completed).length,
		[tasks]
	)
	const allCount = useMemo(() => tasks.length, [tasks])

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

	useEffect(() => {
		setFilterLoading(true)
		setTimeout(() => {
			if (activeFilter === "pending") {
				setFilteredTasks(tasks.filter((task) => !task.completed))
			} else if (activeFilter === "completed") {
				setFilteredTasks(tasks.filter((task) => task.completed))
			} else {
				setFilteredTasks(tasks)
			}
			setFilterLoading(false)
		}, 300)
	}, [activeFilter, tasks])

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

	return (
		<>
			<div className='min-h-screen w-full bg-gradient-to-tr from-purple-700 via-pink-500 to-red-500 text-white p-4 sm:p-6 lg:p-8'>
				<header className='flex items-center justify-between mb-8'>
					<h1 className='text-4xl font-bold'>Minhas tarefas</h1>
					<button
						onClick={logout}
						className='relative group px-4 py-2 text-sm font-bold text-purple-700 bg-white rounded-2xl transition-all duration-300 ease-in-out hover:bg-purple-100 hover:scale-105 active:scale-100'>
						Sair
						<span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
							Fazer logout
						</span>
					</button>
				</header>

				<main className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-1'>
						{/* This button is only visible on mobile */}
						<div className='lg:hidden text-center mb-4'>
							<button
								onClick={() => setIsFormVisibleOnMobile(!isFormVisibleOnMobile)}
								className='relative group w-auto flex items-center gap-x-2 mx-auto px-4 py-3 text-lg font-bold text-white bg-purple-500 hover:bg-purple-600 rounded-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-100'>
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
										d={
											isFormVisibleOnMobile
												? "M6 18L18 6M6 6l12 12"
												: "M12 4v16m8-8H4"
										}
									/>
								</svg>
								{isFormVisibleOnMobile ? "Fechar" : "Nova Tarefa"}
							</button>
						</div>

						{/* The form container */}
						<div
							className={`${
								isFormVisibleOnMobile ? "block" : "hidden"
							} lg:block`}>
							<TaskForm
								onTaskCreated={() => {
									fetchTasks()
									setIsFormVisibleOnMobile(true)
								}}
								onSuccess={() => {}}
							/>
						</div>
					</div>
					<div className='lg:col-span-2'>
						<div className='p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg'>
							<div className='flex flex-col lg:flex-row justify-between lg:items-center mb-6'>
								<h2 className='text-2xl font-bold text-white mb-4 lg:mb-0'>
									Lista de tarefas
								</h2>
								<div className='flex gap-x-2'>
									<button
										onClick={() => setActiveFilter("pending")}
										className={`relative group px-3 py-1 text-sm font-medium rounded-full transition-colors ${
											activeFilter === "pending"
												? "bg-green-500 text-white"
												: "bg-gray-500 text-white/70"
										}`}>
										A fazer ({pendingCount})
										<span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
											Filtrar por tarefas a fazer
										</span>
									</button>
									<button
										onClick={() => setActiveFilter("completed")}
										className={`relative group px-3 py-1 text-sm font-medium rounded-full transition-colors ${
											activeFilter === "completed"
												? "bg-green-500 text-white"
												: "bg-gray-500 text-white/70"
										}`}>
										Concluídas ({completedCount})
										<span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
											Filtrar por tarefas concluídas
										</span>
									</button>
									<button
										onClick={() => setActiveFilter("all")}
										className={`relative group px-3 py-1 text-sm font-medium rounded-full transition-colors ${
											activeFilter === "all"
												? "bg-green-500 text-white"
												: "bg-gray-500 text-white/70"
										}`}>
										Todas ({allCount})
										<span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
											Mostrar todas as tarefas
										</span>
									</button>
								</div>
							</div>
							{loading || filterLoading ? (
								<p>Carregando tarefas...</p>
							) : (
								<div>
									{filteredTasks.length === 0 ? (
										<p className='text-center text-white/80'>
											{activeFilter === "pending"
												? "Parabéns você está em dia com suas tarefas."
												: "Nenhuma tarefa encontrada."}
										</p>
									) : (
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{filteredTasks.map((task) => (
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
								className='relative group px-6 py-2 font-medium rounded-xl bg-gray-200 text-gray-800 transition-all duration-300 ease-in-out hover:bg-gray-300 hover:scale-105 active:scale-100'>
								Cancelar
								<span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
									Cancelar exclusão
								</span>
							</button>
							<button
								onClick={handleDeleteConfirmed}
								className='relative group px-6 py-2 font-bold text-white bg-red-500 rounded-xl transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105 active:scale-100'>
								Apagar
								<span className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
									Confirmar exclusão
								</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
