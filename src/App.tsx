import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import "./index.css"
async function loadPreline() {
  return import('preline/dist/index.js')
}

function App() {
  const location = useLocation()

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline()

      if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
        window.HSStaticMethods.autoInit()
      }
    }

    initPreline()
  }, [location.pathname])

  return (
    <div className="container">
      <h1 className="text-neutral-500">Hello</h1>
    </div>
  )
}

export default App
