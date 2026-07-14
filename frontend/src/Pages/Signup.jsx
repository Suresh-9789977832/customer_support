import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Signup({ onSuccess, onGoToLogin, data, setdata }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [card, setCard] = useState(null);
  const Navigate = useNavigate();

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

      const location = useLocation();
      const firstSegment = location.pathname.split("/")[1];
      const role = firstSegment === "admin" ? "admin" : "user";




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) return;
    if (password !== confirmPassword) {
      setError("Those two passwords don't match.");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://askmydocs-7zjl.onrender.com/auth/signup", {
        name,
        email,
        password,
        role
      });

      if(res.status == 201){
        setEmail('')
        setName('')
        setPassword('')
        setConfirmPassword('')
      }

      Navigate('/login')

    } catch (err) {
      console.error(err);
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
        .rd-input.rd-input-error {
          border-color: var(--rust);
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

        /* Membership card issued on successful signup */
        .rd-membercard {
          background: var(--paper-dark);
          border: 1px solid var(--rule);
          animation: rd-card-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes rd-card-in {
          0% { opacity: 0; transform: translateY(10px) rotate(-1deg); }
          100% { opacity: 1; transform: translateY(0) rotate(-1deg); }
        }
        .rd-stamp {
          border: 2px solid var(--rust);
          color: var(--rust);
          transform: rotate(-7deg);
          letter-spacing: 0.08em;
        }

        @media (prefers-reduced-motion: reduce) {
          .rd-leaf, .rd-membercard { animation: none !important; }
        }
      `}</style>

      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">

      
          <h1 className="rd-display text-3xl sm:text-4xl leading-tight">
            Sign Up
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
          </p>
        </div>

        {card ? (
          <div className="rd-membercard rounded-sm p-6 text-center">
            <p className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] mb-4">
              Membership issued
            </p>
            <div className="flex justify-center mb-4">
              <span className="rd-stamp rd-mono text-xs uppercase px-3 py-1 rounded-sm">
                Member
              </span>
            </div>
            <p className="rd-display text-xl">{card.name}</p>
            <p className="rd-mono text-sm text-[var(--ink-soft)] mt-1">
              Card No. {card.cardNumber}
            </p>
            <button
              type="button"
              onClick={onGoToLogin}
              className="rd-btn rounded-sm w-full mt-6 px-4 py-2.5 text-sm font-medium"
            >
              Sign in with your card
            </button>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="rd-card rd-perforated rounded-sm pl-8 pr-6 py-7"
            >
              <label className="block mb-4">
                <span className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)]">
                  Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="username"
                  className="rd-input rounded-sm w-full mt-1.5 px-3 py-2.5 text-sm"
                  autoComplete="name"
                  required
                />
              </label>

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

              <label className="block mb-4">
                <span className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)]">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="rd-input rounded-sm w-full mt-1.5 px-3 py-2.5 text-sm"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>

              <label className="block mb-2">
                <span className="rd-mono text-xs uppercase tracking-wider text-[var(--ink-soft)]">
                  Confirm password
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Type it once more"
                  className={`rd-input rounded-sm w-full mt-1.5 px-3 py-2.5 text-sm ${
                    passwordsMismatch ? "rd-input-error" : ""
                  }`}
                  autoComplete="new-password"
                  required
                />
              </label>
              {passwordsMismatch && (
                <p className="text-xs text-[var(--rust)] mb-3">
                  Passwords don't match yet.
                </p>
              )}

              {error && (
                <p className="text-sm text-[var(--rust)] mt-3 mb-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={
                  !name.trim() ||
                  !email.trim() ||
                  !password ||
                  passwordsMismatch ||
                  loading
                }
                className="rd-btn rounded-sm w-full mt-5 px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="rd-leaves">
                      <span className="rd-leaf"></span>
                      <span className="rd-leaf"></span>
                      <span className="rd-leaf"></span>
                    </span>
                    Signing Up...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[var(--ink-soft)] mt-6">
             I Already have an account?{" "}
              <button
                type="button"
                onClick={()=>role=='admin'?Navigate('/admin/login'): Navigate('/login')}
                className="rd-link underline font-medium cursor-pointer"
              >
                Sign in
              </button>


            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
