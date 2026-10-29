import React from 'react';
import { useRouter } from '../context/RouterContext.jsx';
import { ArrowRight } from 'lucide-react';

export default function LoginLanding() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-[#201B4F] selection:text-white">
      {/* Left Branding Panel */}
      <div className="w-full lg:w-1/2 bg-[#201B4F] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 lg:py-0 min-h-[360px] lg:min-h-screen">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12]">
            Titanz<br />
            Management System
          </h1>
          <p className="mt-8 text-base sm:text-lg lg:text-[18.5px] text-[#A4B5DC] leading-[1.65] font-normal max-w-lg">
            Streamlining workforce operation, track attendance,<br className="hidden sm:inline" />
            manage payroll, and empower team securely.
          </p>
        </div>
      </div>

      {/* Right Portal Selection Panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-6 sm:px-12 py-12 lg:py-0 min-h-screen">
        <div className="w-full max-w-[390px]">
          <h2 className="text-[32px] font-bold text-[#111827] tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2.5 text-[15px] text-[#1f2937] font-normal leading-normal">
            Select your portal to securely access the portal
          </p>

          <div className="mt-8 space-y-4">
            {/* Card 1: Admin Portal */}
            <button
              onClick={() => navigate('/login/admin')}
              className="w-full h-[108px] px-7 flex flex-col justify-center items-start bg-[#F8FAFC] border border-[#E2E8F0] rounded-[11px] text-left transition-all duration-200 hover:border-[#A4B5DC] hover:shadow-sm hover:bg-[#f1f5f9] group focus:outline-none focus:ring-2 focus:ring-[#201B4F] focus:ring-offset-2 cursor-pointer"
            >
              <span className="text-[17px] font-semibold text-[#111827] group-hover:text-[#201B4F] transition-colors">
                Admin Portal
              </span>
              <ArrowRight className="w-5 h-5 text-[#A4B5DC] mt-2 group-hover:text-[#201B4F] group-hover:translate-x-1 transition-all" />
            </button>

            {/* Card 2: Employee Portal */}
            <button
              onClick={() => navigate('/login/employee')}
              className="w-full h-[108px] px-7 flex flex-col justify-center items-start bg-[#F8FAFC] border border-[#E2E8F0] rounded-[11px] text-left transition-all duration-200 hover:border-[#A4B5DC] hover:shadow-sm hover:bg-[#f1f5f9] group focus:outline-none focus:ring-2 focus:ring-[#201B4F] focus:ring-offset-2 cursor-pointer"
            >
              <span className="text-[17px] font-semibold text-[#111827] group-hover:text-[#201B4F] transition-colors">
                Employee Portal
              </span>
              <ArrowRight className="w-5 h-5 text-[#A4B5DC] mt-2 group-hover:text-[#201B4F] group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-14 text-left">
            <p className="text-[13.5px] text-[#A4B5DC] font-normal">
              @ 2026 Titanz Security Group. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
