import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Login({ onSuccess, onGoToSignup, data, setdata }) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const location = useLocation();
  const firstSegment = location.pathname.split("/")[1];
  const role = firstSegment === "admin" ? "admin" : "user";
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://askmydocs-7zjl.onrender.com/auth/login", {
        email,
        password,
        role
      });

      if(res.data){
        localStorage.setItem('Token',res.data.user.Token)
      }

        if(res.status == 200){
        setEmail('')
        setPassword('')
        setdata(res.data.user)
        Navigate('/')
        }

    } catch (err) {
      console.error(err);
      setError("That card doesn't match our records. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rd-root min-h-screen flex items-center justify-center px-6 py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .rd-root {
          --paper: #EDEBE2;
          --paper-card: #F5F3EC;
          --paper-dark: #E1DCCC;
          --ink: #1C2321;
          --ink-soft: #5B6360;
          --teal: #2F6F5E;
          --teal-dark: #204B3F;
          --rust: #B8501E;
          --rule: #C9C3B4;

          background-color: var(--paper);
          background-image:
            repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 3px);
          color: var(--ink);
          font-family: 'Work Sans', sans-serif;
        }

        .rd-display { font-family: 'Fraunces', serif; }
        .rd-mono { font-family: 'IBM Plex Mono', monospace; }

        .rd-card {
          background: var(--paper-card);
          border: 1px solid var(--rule);
          box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 12px 24px -16px rgba(28,35,33,0.25);
        }

        .rd-perforated { position: relative; }
        .rd-perforated::before {
          content: "";
          position: absolute;
          left: -1px;
          top: 0;
          bottom: 0;
          width: 14px;
          background-image: radial-gradient(circle at 7px 10px, var(--paper) 3.5px, transparent 4px);
          background-size: 14px 20px;
          background-repeat: repeat-y;
        }

        .rd-input {
          background: var(--paper-card);
          border: 1px solid var(--rule);
        }
        .rd-input:focus {
          border-color: var(--teal);
          outline: none;
        }

        .rd-btn {
          background: var(--ink);
          color: var(--paper-card);
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        .rd-btn:hover:not(:disabled) {
          background: var(--teal-dark);
          transform: translateY(-1px);
        }
        .rd-btn:active:not(:disabled) { transform: translateY(0px); }
        .rd-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .rd-btn:focus-visible, .rd-input:focus-visible, .rd-link:focus-visible {
          outline: 2px solid var(--teal);
          outline-offset: 2px;
        }

        .rd-link {
          color: var(--teal-dark);
          text-underline-offset: 3px;
        }
        .rd-link:hover { color: var(--rust); }

        .rd-leaves {
          display: inline-flex;
          gap: 5px;
          align-items: flex-end;
          height: 16px;
        }
        .rd-leaf {
          width: 6px;
          height: 14px;
          background: var(--teal);
          border-radius: 1px;
          transform-origin: bottom center;
          animation: rd-leaf-flip 1.1s ease-in-out infinite;
        }
        .rd-btn .rd-leaf { background: var(--paper-card); }
        .rd-leaf:nth-child(2) { animation-delay: 0.15s; }
        .rd-leaf:nth-child(3) { animation-delay: 0.3s; }
        @keyframes rd-leaf-flip {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-leaf { animation: none !important; }
        }
      `}</style>

      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
         
          <h1 className="rd-display text-3xl sm:text-4xl leading-tight">
            Login
          </h1>
         
        </div>

        <form
          onSubmit={handleSubmit}
          className="rd-card rd-perforated rounded-sm pl-8 pr-6 py-7"
        >
          <label className="block mb-4">
            <span className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)]">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rd-input rounded-sm w-full mt-1.5 px-3 py-2.5 text-sm"
              autoComplete="email"
              required
            />
          </label>

          <label className="block mb-2">
            <span className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)]">
              Password
            </span>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rd-input rounded-sm w-full px-3 py-2.5 text-sm pr-16"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="rd-mono absolute right-2.5 top-1/2 -translate-y-1/2 text-[0.68rem] uppercase text-[var(--ink-soft)] hover:text-[var(--teal-dark)]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

       

          {error && <p className="text-sm text-[var(--rust)] mb-4">{error}</p>}

          <button
            type="submit"
            disabled={!email.trim() || !password || loading}
            className="rd-btn rounded-sm w-full px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="rd-leaves">
                  <span className="rd-leaf"></span>
                  <span className="rd-leaf"></span>
                  <span className="rd-leaf"></span>
                </span>
                Signing In...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--ink-soft)] mt-6">
          Don't Have an account?{" "}
          <button
            type="button"
            onClick={()=>role=='admin'?Navigate('/admin/signup'): Navigate('/signup')}
            className="rd-link underline font-medium cursor-pointer"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
