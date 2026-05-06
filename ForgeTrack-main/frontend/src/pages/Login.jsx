import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  GraduationCap, 
  Briefcase,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(true);
  const [identifier, setIdentifier] = useState(''); // USN or Email
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const inferRoleFromUser = (user) => {
    const metaRole = user?.user_metadata?.role;
    if (metaRole === 'mentor' || metaRole === 'student') return metaRole;
    if (user?.email?.toLowerCase().endsWith('@forge.com')) return 'student';
    return 'mentor';
  };

  const redirectByRole = async (user) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    // Fallback: if users lookup fails (e.g., RLS/policy issue), infer from auth data.
    const role = (data?.role === 'mentor' || data?.role === 'student') ? data.role : inferRoleFromUser(user);

    if (role === 'mentor') {
      navigate('/dashboard', { replace: true });
      return;
    }

    if (role === 'student') {
      navigate('/me/attendance', { replace: true });
      return;
    }

    navigate('/403', { replace: true });
  };

  useEffect(() => {
    const redirectIfAuthenticated = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await redirectByRole(user);
      }
    };

    redirectIfAuthenticated();
  }, []);

  const submitAuth = async () => {
    setErrorStatus('');
    setLoading(true);
    try {
      const cleanIdentifier = identifier.trim();
      const emailObj = isStudent
        ? (cleanIdentifier.includes('@')
          ? cleanIdentifier.toLowerCase()
          : `${cleanIdentifier.toUpperCase()}@forge.com`)
        : cleanIdentifier.toLowerCase();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailObj,
        password: password
      });

      if (error) throw error;

      const studentDefaultPasswordSeed = cleanIdentifier.includes('@')
        ? cleanIdentifier.split('@')[0].toUpperCase()
        : cleanIdentifier.toUpperCase();

      if (isStudent && password === studentDefaultPasswordSeed) {
        setNeedsPasswordChange(true);
        setLoading(false);
        return;
      }

      await redirectByRole(data.user);
    } catch (err) {
      const msg = err?.message || "Invalid credentials provided";
      if (msg.toLowerCase().includes('database error querying schema')) {
        setErrorStatus('Supabase schema/policy issue detected. Apply updated SQL policies in backend/supabase/schema.sql, then try again.');
      } else {
        setErrorStatus(msg);
      }
    } finally {
      if (!needsPasswordChange) setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setErrorStatus('');
    if (newPassword.length < 6) {
      setErrorStatus("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      setNeedsPasswordChange(false);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await redirectByRole(user);
      }
    } catch (err) {
      setErrorStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden">
      {/* Left Side: Professional Branding */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 flex-col justify-between p-12 relative overflow-hidden shadow-2xl z-10">
        {/* Subtle geometric overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white text-blue-900 rounded-xl flex items-center justify-center font-extrabold text-2xl shadow-lg">
              F
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Forge <span className="text-blue-300">Track</span>
          </h1>
          <p className="text-blue-100/80 text-lg max-w-md leading-relaxed font-light">
            Empowering the next generation of innovators through structured guidance, resource sharing, and secure enterprise collaboration.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-blue-200/60 text-sm font-medium">
          <ShieldCheck size={18} />
          <span>Enterprise-Grade Security</span>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md">
              F
            </div>
            <span className="text-slate-900 text-2xl font-bold tracking-tight">Forge Track</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 text-sm">Please enter your details to sign in.</p>
          </div>

          {needsPasswordChange ? (
            <div className="flex flex-col gap-5">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
                <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-blue-900 leading-relaxed font-medium">
                  For your security, please set a new password to continue.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Must be at least 6 characters"
                  />
                </div>
              </div>

              {errorStatus && (
                <div className="text-sm text-red-600 bg-red-50 py-2.5 px-3 rounded-lg border border-red-100 flex items-center gap-2">
                  <AlertCircle size={16} /> {errorStatus}
                </div>
              )}

              <button 
                onClick={handlePasswordReset} 
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
              >
                {loading ? 'Updating...' : 'Update Password'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          ) : (
            <>
              {/* Role Switcher */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                <button 
                  onClick={() => { setIsStudent(true); setErrorStatus(''); }}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    isStudent ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <GraduationCap size={16} /> Student
                </button>
                <button 
                  onClick={() => { setIsStudent(false); setErrorStatus(''); }}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    !isStudent ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Briefcase size={16} /> Mentor
                </button>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {isStudent ? 'University Seat Number' : 'Email Address'}
                  </label>
                  <div className="relative">
                    {isStudent ? (
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    ) : (
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    )}
                    <input 
                      type={isStudent ? 'text' : 'email'} 
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${isStudent ? 'font-mono uppercase' : ''}`}
                      placeholder={isStudent ? 'e.g. 4SH24CS002' : 'name@company.com'}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Password</label>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {errorStatus && (
                  <div className="text-sm text-red-600 bg-red-50 py-2.5 px-3 rounded-lg border border-red-100 flex items-center gap-2">
                    <AlertCircle size={16} /> {errorStatus}
                  </div>
                )}

                <button 
                  onClick={submitAuth}
                  disabled={loading || !identifier || !password}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4 shadow-sm shadow-blue-600/20"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </div>
            </>
          )}
        </div>
        
        <p className="absolute bottom-8 text-center text-sm text-slate-500 w-full lg:w-7/12 left-0 lg:left-5/12">
          Need help? <button className="text-blue-600 hover:underline font-medium transition-colors">Contact Support</button>
        </p>
      </div>
    </div>
  );
}

