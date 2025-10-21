import { useState } from "react";
import { Link, useNavigate } from "react-router";

function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/");
  }
  return (
    <>
      <div className="relative flex flex-col justify-center w-screen min-h-screen overflow-hidden bg-base-200">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-100">
          <h1 className="text-3xl font-semibold text-center text-accent-focus">
            Log In
          </h1>

          <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
            <div>
              <label className="label justify-center">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full input input-bordered input-accent"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-accent w-full mt-5 bg-sky-700">
                Log In
              </button>
            </div>
            <div className="divider px-10 mt-10">OR</div>
            <Link to="/" className="btn btn-neutral mt-5 w-full">
              Use Counter
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
