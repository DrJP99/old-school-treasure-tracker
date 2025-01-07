import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Options from './components/Options/Options'

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
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/options" element={<Options />} />
            </Routes>
        </div>
    )
}

export default App
