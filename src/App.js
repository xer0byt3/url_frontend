import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Navigation } from './components/Navigation';
import { Logout } from './components/Logout';
import Analytics from "./components/Analytics";
import RedirectUrl from './components/Redirect';
import { AuthProvider } from './context/AuthContext';
import {Signup} from './components/Signup'
import {ForgotPassword} from './components/ForgotPassword'
import {ResetPassword} from './components/ResetPassword'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/:short_id" element={<RedirectUrl/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
