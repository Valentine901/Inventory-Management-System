import { useState, useEffect } from "react";
import { X, Eye, EyeClosed } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { createStaff } from "../../../services/Staff";

const inputClass = 'w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600';

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
      showNotification(getErrorMessage(err), "error");
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
          <h2 id="create-staff-title" className='text-sm text-gray-500'>
            Add new staff
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className='w-full'>
            <label className='text-sm text-gray-500' htmlFor="price">Full Name</label>
            <input type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='e.g., John Doe'
              className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
          </div>
          <div className='w-full'>
            <label className='text-sm text-gray-500' htmlFor="price">
              Member ID
            </label>
            <input type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder='e.g., STF-373-3938'
              className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
          </div>

          <div className='w-full'>
            <label className='text-sm text-gray-500' htmlFor="email">Email Address</label>
            <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='e.g., example@gmail.com'
              className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
          </div>

          <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-500' htmlFor="email">Password</label>
            <div className="flex items-center gap-2 rounded-full bg-zinc-300 px-4 transition focus-within:ring-2 focus-within:ring-purple-600/40">
              <input
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full flex gap-2 py-2 outline-none rounded-full bg-zinc-300 px-4 transition"
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
          <div className="mt-2 flex gap-3 sm:justify-start">
            <button
              type="button"
              onClick={onClose}
             className='p-3 rounded-full border font-semibold w-30 text-sm hover:bg-black hover:text-gray-100 transition-all duration-300'
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="p-3 rounded-full bg-purple-600 text-gray-100 hover:bg-purple-500 transition-all duration-300 font-semibold w-30 text-sm"
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