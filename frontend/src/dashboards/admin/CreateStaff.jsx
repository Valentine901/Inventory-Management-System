import { useState, useEffect } from "react";
import { X, Eye, EyeClosed } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useAutoClear } from "../../hooks/useAutoClear"
import { createStaff } from "../../services/Staff";

const inputClass = "w-full bg-zinc-300 py-3 px-4 rounded-full outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-purple-600/40 transition";

const CreateStaff = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [memberId, setMemberId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useToast();

  // close with the Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      createStaff(username, email, password, memberId);
      showNotification("New staff created successfully");
      setUsername("");
      setEmail("");
      setMemberId("");
      setPassword("");
      onClose();
    } catch (err) {
      showNotification(
        err.response?.data?.message ??
        (err.request ? "Could not reach the server" : "Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  };


  return (

    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 font-alt"
    >

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-staff-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl mt-4 sm:mt-12 bg-purple-50 rounded-xl p-4 sm:p-6 flex flex-col"
      >

        <div className="relative flex items-center justify-center">
          <h2 id="create-staff-title" className="text-xl font-semibold text-zinc-800">
            Add new staff
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-semibold text-zinc-800">
              Full Name
            </label>
            <input
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              type="text"
              autoComplete="off"
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="memberId" className="text-sm font-semibold text-zinc-800">
              Member ID
            </label>
            <input
              id="memberId"
              required
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className={inputClass}
              type="text"
              autoComplete="off"
              placeholder="e.g., STF-2746-000-156"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold text-zinc-800">
              Email Address
            </label>
            <input
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              type="email"
              autoComplete="off"
              placeholder="e.g., john@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold text-zinc-800">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-full bg-zinc-300 px-4 transition focus-within:ring-2 focus-within:ring-purple-600/40">
              <input
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 bg-transparent outline-none placeholder:text-zinc-500"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            </div>
          </div>

          {/* actions */}
          <div className="mt-2 flex gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none min-w-28 py-3 rounded-full text-white font-semibold bg-black hover:bg-black/90 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none min-w-28 py-3 rounded-full text-white font-semibold bg-purple-600 hover:bg-purple-600/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;