import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Options from './components/Options/Options'
import About from './components/About/About'

const App = () => {
    const navigate = useNavigate()
    return (
        <div className="main">
            <h1>Old-School Treasure Tracker</h1>
            <div>
                <button
                    className="btn btn-inline"
                    onClick={() => navigate('/')}
                >
                    Home
                </button>
                {' | '}
                <button
                    className="btn btn-inline"
                    onClick={() => navigate('/options')}
                >
                    Options
                </button>
                {' | '}
                <button
                    className="btn btn-inline"
                    onClick={() => navigate('/about')}
                >
                    About
                </button>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/options" element={<Options />} />
                <Route path="/about" element={<About />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default App
