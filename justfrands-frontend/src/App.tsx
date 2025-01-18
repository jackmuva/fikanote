import { Routes, Route } from 'react-router';
import './App.css'
import EditorPage from './pages/EditorPage';
import { ReaderPage } from './pages/ReaderPage';

function App() {
  return (
    <div className='py-10 absolute top-0 left-0 w-screen flex flex-col justify-start items-center'>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/doc/:docId" element={<ReaderPage />} />
      </Routes>
    </div>
  );
}
export default App
