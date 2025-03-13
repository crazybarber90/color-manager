import './App.css'
import ColorList from './components/ColorList/ColorList'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div style={{ position: 'relative' }}>
      <ToastContainer position="top-right" autoClose={5000} />
      <ColorList />
    </div>
  )
}

export default App
