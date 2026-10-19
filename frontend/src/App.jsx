import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Workspace from './pages/Workspace.jsx';
export default function App() {
return (<Routes>
<Route path="/" element={<Landing />} />
<Route path="/algo/:id" element={<Workspace />} />
<Route path="*" element={<Navigate to="/" />} />
</Routes>);
}
