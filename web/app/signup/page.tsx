"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

type ProfileKey = "regular" | "lab" | "doctor" | "research";

const profiles: { label: string; value: ProfileKey | "guest"; description: string }[] = [
  {
    label: "Regular User",
    value: "regular",
    description: "Personal access to your medical records.",
  },
  {
    label: "Lab Technician",
    value: "lab",
    description: "Manage lab results and reports.",
  },
  {
    label: "Doctor & Hospital",
    value: "doctor",
    description: "Access and manage patient records as a healthcare provider.",
  },
  {
    label: "Research & Institution",
    value: "research",
    description: "Institutional or research-based access.",
  },
  {
    label: "Guest",
    value: "guest",
    description: "Try the dashboard instantly as a guest user.",
  },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<ProfileKey | "">("");
  const [form, setForm] = useState<Record<string, string | number>>( {} );
  const [agreed, setAgreed] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form field definitions for each profile
  const formFields: Record<ProfileKey, Array<{ name: string; label: string; type: string; required: boolean }>> = {
    regular: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "emergencyContactName", label: "Emergency Contact Name", type: "text", required: true },
      { name: "emergencyContactPhone", label: "Emergency Contact Phone", type: "tel", required: true },
    ],
    lab: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "labName", label: "Lab Name", type: "text", required: true },
      { name: "certification", label: "Certification Details", type: "text", required: true },
      { name: "experience", label: "Years of Experience", type: "number", required: true },
    ],
    doctor: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "license", label: "Medical License Number", type: "text", required: true },
      { name: "practiceLicense", label: "Practice License Details", type: "text", required: true },
      { name: "specialization", label: "Specialization", type: "text", required: true },
      { name: "employer", label: "Employer / Hospital Name", type: "text", required: true },
      { name: "experience", label: "Years of Experience", type: "number", required: true },
      // Hospital fields
      { name: "hospitalName", label: "Hospital Name", type: "text", required: false },
      { name: "hospitalReg", label: "Registration Number", type: "text", required: false },
      { name: "hospitalAddress", label: "Address", type: "text", required: false },
      { name: "hospitalEmail", label: "Contact Email", type: "email", required: false },
      { name: "hospitalPhone", label: "Contact Phone", type: "tel", required: false },
    ],
    research: [
      { name: "institutionName", label: "Institution Name", type: "text", required: true },
      { name: "focus", label: "Research Focus Area", type: "text", required: true },
      { name: "regNumber", label: "Registration Number", type: "text", required: true },
      { name: "contactName", label: "Contact Person Name", type: "text", required: true },
      { name: "email", label: "Official Email", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "address", label: "Address", type: "text", required: true },
    ],
  };

  function handleProfileSelect(val: ProfileKey | "guest") {
    if (val === "guest") {
      // Guest: generate guest ID and go to dashboard
      const guestId = 'guest-' + Math.random().toString(36).substring(2, 10);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('guestId', guestId);
        sessionStorage.setItem('isGuest', 'true');
      }
      router.push('/dashboard');
      return;
    }
    setProfile(val);
    setStep(2);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateForm() {
    const fields = profile && formFields[profile as ProfileKey] ? formFields[profile as ProfileKey] : [];
    const errs: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.required && !form[f.name]) {
        errs[f.name] = "Required";
      }
    });
    if (!agreed) errs["agreed"] = "You must agree to terms.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-2 py-8">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl">
        {step === 1 && (
          <>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6" style={{ color: "#3659f8" }}>Select User Profile</h1>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
              {profiles.map(opt => (
                <button
                  key={opt.value}
                  className="rounded-[14px] bg-[#3659f8] text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 p-6 md:p-10 lg:p-12 flex flex-col items-center justify-center min-h-[120px] md:min-h-[180px] lg:min-h-[220px] text-base md:text-lg lg:text-xl"
                  style={{ boxShadow: "0 2px 8px rgba(54,89,248,0.10)" }}
                  onClick={() => handleProfileSelect(opt.value)}
                >
                  <span className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{opt.label}</span>
                  <span className="text-sm md:text-base lg:text-lg opacity-80 text-center">{opt.description}</span>
                </button>
              ))}
            </div>
          </>
        )}
        {step === 2 && profile && (
          <form className="bg-[#3659f8] rounded-[14px] shadow-lg p-6 md:p-10 lg:p-12 mt-4 text-white" onSubmit={handleSubmit}>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{profiles.find(p => p.value === profile)?.label} Information</h2>
            <div className="grid gap-3 md:gap-6 lg:gap-8">
              {(formFields[profile as ProfileKey] || []).map((f) => (
                <div key={f.name} className="flex flex-col">
                  <label htmlFor={f.name} className="mb-1 text-sm md:text-base lg:text-lg font-medium text-white/90">{f.label}{f.required && " *"}</label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    value={form[f.name] || ""}
                    onChange={handleInputChange}
                    className="rounded-md px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 text-[#3659f8] bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base md:text-lg lg:text-xl"
                  />
                  {errors[f.name] && <span className="text-red-200 text-xs md:text-sm mt-1">{errors[f.name]}</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreed" className="text-white/90 text-sm md:text-base">I agree to the <a href="#" className="underline">Terms of Service</a></label>
            </div>
            {errors["agreed"] && <span className="text-red-200 text-xs md:text-sm mt-1 block">{errors["agreed"]}</span>}
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-white text-[#3659f8] font-bold py-2 md:py-3 lg:py-4 text-lg md:text-xl lg:text-2xl hover:bg-blue-100 transition-all duration-300"
            >
              Sign Up & Go to Dashboard
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
