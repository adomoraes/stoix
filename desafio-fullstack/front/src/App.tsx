import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { Router } from "./Router"

export function App() {
	return (
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<AuthProvider>
				<main className='pt-16'>
					<Router />
				</main>
			</AuthProvider>
		</BrowserRouter>
	)
}
