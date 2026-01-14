import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Banknote,
  ArrowRight,
  Lock,
  CreditCard,
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-700 to-emerald-600 text-white">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wide">
          <span className="text-emerald-300">Bank</span>It
        </h1>

        <Link
          to="/login"
          className="bg-white text-indigo-700 px-5 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition"
        >
          Login
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-sm text-emerald-200">
            Secure • Smart • Simple
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Banking made<br />
            <span className="text-emerald-300">simple & powerful</span>
          </h2>

          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            BankIt helps you manage savings accounts, fixed deposits,
            balances, and interest — all in one secure mobile app.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-emerald-400 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-emerald-300 transition"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/login"
              className="text-white/80 hover:text-white underline underline-offset-4"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-6">
          <Feature
            icon={<Banknote className="text-emerald-400" />}
            title="All Accounts"
            desc="Savings & Fixed Deposits"
            bg="from-emerald-500/20 to-emerald-700/20"
          />
          <Feature
            icon={<TrendingUp className="text-violet-400" />}
            title="Track Growth"
            desc="Interest & balance insights"
            bg="from-violet-500/20 to-indigo-700/20"
          />
          <Feature
            icon={<ShieldCheck className="text-amber-400" />}
            title="Highly Secure"
            desc="Bank-grade security"
            bg="from-amber-500/20 to-orange-600/20"
          />
          <Feature
            icon={<Smartphone className="text-sky-400" />}
            title="Mobile Ready"
            desc="Optimized for Android"
            bg="from-sky-500/20 to-blue-700/20"
          />
        </div>
      </div>

      {/* Trust Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 grid md:grid-cols-3 gap-6 text-center">
          <Trust
            icon={<Lock className="text-emerald-300" />}
            title="Encrypted Data"
          />
          <Trust
            icon={<CreditCard className="text-violet-300" />}
            title="Multiple Banks"
          />
          <Trust
            icon={<ShieldCheck className="text-amber-300" />}
            title="Trusted Platform"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-white/70 pb-6 text-sm">
        © {new Date().getFullYear()} BankIt · Smart Digital Banking
      </div>
    </div>
  );
};

/* ---------- Components ---------- */

const Feature = ({
  icon,
  title,
  desc,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bg: string;
}) => (
  <div
    className={`rounded-2xl p-6 bg-gradient-to-br ${bg} border border-white/10 shadow-lg`}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm text-white/80">{desc}</p>
  </div>
);

const Trust = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div className="p-3 bg-white/10 rounded-xl">{icon}</div>
    <p className="font-semibold">{title}</p>
  </div>
);
