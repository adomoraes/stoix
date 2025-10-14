import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"

export function App() {
	return (
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<main className='pt-16'>
				<Router />
			</main>
		</BrowserRouter>
	)
}
