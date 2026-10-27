import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { createSupplier } from "../../../services/Supplier";
// import { getErrorMessage } from "../../../utils/getErrorMessage";


const inputClass = 'w-full py-2 px-3 rounded-full placeholder:text-sm bg-zinc-200 focus:outline-2 focus:outline-purple-600';

const CreateSupplier = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
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
      // console.log("creating supplier...")
      await createSupplier(username, company, email);
      showNotification("New supplier added");
      // console.log("Done...")
      setUsername("");
      setEmail("");
      setCompany("");
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
      className="fixed inset-0 z-99 flex items-start justify-center overflow-y-auto bg-black/50 p-4 font-alt"
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
            New supplier
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
            <label htmlFor="username" className='text-sm text-gray-500'>
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
            <label htmlFor="companyName" className='text-sm text-gray-500'>
              Company Name
            </label>
            <input
              id="companyName"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
              type="text"
              autoComplete="off"
              placeholder="e.g., Blomberg Group"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className='text-sm text-gray-500'>
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

export default CreateSupplier;