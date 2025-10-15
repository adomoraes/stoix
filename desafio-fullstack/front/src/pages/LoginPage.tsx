import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

export function LoginPage() {
	const { login } = useAuth()
	const [email, setEmail] = useState("test@example.com")
	const [password, setPassword] = useState("password")
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		try {
			await login({ email, password })
		} catch (err: any) {
			if (err.response && err.response.status === 422) {
				setError("The provided credentials do not match our records.")
			} else {
				setError("An unexpected error occurred. Please try again.")
			}
			console.error(err)
		}
	}

	return (
		<div className='min-h-screen w-full bg-gradient-to-tr from-purple-700 via-pink-500 to-red-500 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<div className='p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg text-white'>
					<h1 className='text-4xl font-bold text-center mb-2'>ToDo List App</h1>
					<p className='text-center text-white/80 mb-8'>
						Entre com seus dados para acessar a lista de tarefas.
					</p>

					<form onSubmit={handleSubmit}>
						{error && (
							<div className='bg-red-500/50 text-white p-3 rounded-lg mb-4 text-center'>
								{error}
							</div>
						)}
						<div className='mb-4'>
							<label htmlFor='email' className='block text-sm font-bold mb-2'>
								Email
							</label>
							<input
								type='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='w-full px-4 py-3 bg-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent placeholder-white'
								placeholder='you@example.com'
								required
							/>
						</div>
						<div className='mb-6'>
							<label
								htmlFor='password'
								className='block text-sm font-bold mb-2'>
								Senha
							</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full px-4 py-3 bg-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 border-transparent placeholder-white'
								placeholder='••••••••'
								required
							/>
						</div>
						<button
							type='submit'
							className='relative group w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-100'>
							Entrar
							<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
								Acessar sua conta
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
