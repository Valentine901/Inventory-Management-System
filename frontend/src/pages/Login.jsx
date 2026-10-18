import { useState, useEffect } from "react";
import { User, EyeClosed, Eye, Lock } from "lucide-react";
import login_bg_img from "../assets/images/loginbdimg.png";
import { login } from "../services/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { role } = await login(formData.identifier, formData.password);
            navigate(role === "admin" ? "/admin-dashboard" : "/staff-dashboard");
        } catch (err) {
            setError(err.response?.data?.message ?? "Could not sign in");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timer = setTimeout(() => {
            if (error) {
                setError("");
            }
        }, 3000)
        return () => clearTimeout(timer);
    }, [error])

    return (
        <div className="bg-purple-600/8 w-full min-h-screen font-alt flex items-center justify-center">
            <div className="flex w-full items-center justify-center gap-6 py-12 md:pt-24 mx-auto">
                {/* login container */}
                <div className="flex flex-col gap-2 max-w-xl w-full py-6 px-6 sm:px-16 lg:px-6 rounded-xl">
                    <div className="flex text-4xl lg:text-5xl font-extrabold justify-center">
                        <span className="text-purple-600">Inve</span>
                        <span>nio</span>
                    </div>

                    <div className="justify-center items-center flex flex-col mt-10 space-y-1 text-center">
                        <h2 className="text-black font-bold text-xl lg:text-2xl">Welcome back</h2>
                        <p className="text-md tracking-wider text-gray-600">
                            Sign in to manage your store and products
                        </p>
                    </div>

                    <div className="flex flex-col mt-5">
                        <h3 className="text-md font-semibold">Sign in to continue</h3>
                        <span className="text-sm text-gray-600">
                            Access your dashboard, products, and store tools.
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
                        {/* identifier */}
                        <div className="flex items-center gap-3 px-3 rounded-full border border-transparent bg-zinc-800/5 transition-colors focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30">
                            <User className="shrink-0 text-zinc-500" size={20} />
                            <input
                                name="identifier"
                                value={formData.identifier}
                                onChange={handleChange}
                                required
                                className="w-full py-3 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-500"
                                type="text"
                                placeholder="Email/MemberID"
                            />
                        </div>

                        {/* password */}
                        <div className="flex items-center gap-3 px-3 rounded-full border border-transparent bg-zinc-800/5 transition-colors focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30">
                            <Lock className="shrink-0 text-zinc-500" size={20} />
                            <input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full py-3 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-500"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="shrink-0 text-zinc-500 hover:text-zinc-700 transition-colors"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </button>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg p-3 bg-purple-600 hover:bg-purple-600/90 disabled:opacity-60 text-zinc-100 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <div className="hidden md:block max-w-1/2 lg:max-w-1/3 w-full">
                    <img className="w-full" src={login_bg_img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;