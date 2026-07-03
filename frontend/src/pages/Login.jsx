import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import AuthTabs from "../components/auth/AuthTabs";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <AuthLayout>

      <div
  className="
  w-full
  max-w-xl
  p-8
  rounded-3xl
  border
  border-blue-400/20
  bg-slate-900/60
  backdrop-blur-2xl
  shadow-[0_20px_80px_rgba(0,0,0,0.5)]
"
>

        <div className="text-center mb-8">

          <h2 className="text-4xl font-bold text-white mb-3">
  Welcome to JobSpark AI
</h2>

<p className="text-blue-200">
  Smart hiring powered by Artificial Intelligence
</p>

        </div>

        <AuthTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="mt-6">
          {activeTab === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
        </div>

      </div>

    </AuthLayout>
  );
};

export default Login;