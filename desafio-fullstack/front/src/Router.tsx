import { Route, Routes } from 'react-router-dom'
import { TestPage } from './pages/TestPage'

export function Router() {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />
    </Routes>
  )
}