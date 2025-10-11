import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"

export function App() {
	return (
		<BrowserRouter>
			<main className='pt-16'>
				<Router />
			</main>
		</BrowserRouter>
	)
}
