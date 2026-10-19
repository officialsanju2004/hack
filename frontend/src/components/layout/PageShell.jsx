import Navbar from './Navbar.jsx';
export default function PageShell({ children }) {
return (<div className="min-h-screen bg-base"><Navbar /><main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">{children}</main></div>);
}
