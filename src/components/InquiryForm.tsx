import { useState } from "react";
import { TRADE_TYPES, type Inquiry } from "@/data/mockData";
import { makeId, updateContent, useContent } from "@/lib/content-store";
import { SectionHeading } from "@/components/sections";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  requirement: string;
  quantity: string;
  tradeType: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  requirement: "",
  quantity: "",
  tradeType: "",
  message: "",
};

const MAX = 1000;

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  else if (form.name.trim().length > 100) errors.name = "Name must be under 100 characters.";
  if (!form.company.trim()) errors.company = "Company name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[0-9+()\-\s]{6,20}$/.test(form.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (!form.country.trim()) errors.country = "Country is required.";
  if (!form.requirement.trim()) errors.requirement = "Product / requirement is required.";
  if (!form.tradeType) errors.tradeType = "Select a trade type.";
  if (form.message.trim().length > MAX) errors.message = `Message must be under ${MAX} characters.`;
  return errors;
}

export function InquirySection() {
  const { inquiries } = useContent();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSubmitted(false);
      return;
    }
    const inquiry: Inquiry = {
      id: makeId("iq"),
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      country: form.country.trim(),
      requirement: form.requirement.trim(),
      quantity: form.quantity.trim(),
      tradeType: form.tradeType,
      message: form.message.trim(),
      date: new Date().toISOString(),
      status: "New",
    };
    updateContent({ inquiries: [inquiry, ...inquiries] });
    setForm(EMPTY);
    setSubmitted(true);
  }

  const fields: Array<{ key: keyof FormState; label: string; type?: string; required?: boolean }> = [
    { key: "name", label: "Full Name", required: true },
    { key: "company", label: "Company Name", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "tel", required: true },
    { key: "country", label: "Country", required: true },
    { key: "requirement", label: "Product / Requirement", required: true },
    { key: "quantity", label: "Quantity" },
  ];

  return (
    <section id="inquiry" className="section-pad bg-background">
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Business Inquiry"
            title="Tell Us What You Need To Source"
            description="Submit your wholesale or export-import requirement. In this demo, submissions are stored locally in your browser and appear inside the admin dashboard — no emails are sent."
          />
          <div className="mt-8 rounded-2xl surface-navy p-6">
            <p className="eyebrow-gold">Demo Notice</p>
            <p className="mt-2 text-sm text-white/75">
              This website is a front-end demonstration. Inquiry data is saved to localStorage only
              and is not transmitted anywhere.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="card-base p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={field.key === "requirement" ? "sm:col-span-2" : ""}>
                <label htmlFor={field.key} className="text-sm font-medium text-foreground">
                  {field.label}
                  {field.required ? <span className="text-destructive"> *</span> : null}
                </label>
                <input
                  id={field.key}
                  name={field.key}
                  type={field.type ?? "text"}
                  className="field mt-1.5"
                  value={form[field.key]}
                  maxLength={200}
                  aria-invalid={Boolean(errors[field.key])}
                  aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                  onChange={(event) => set(field.key, event.target.value)}
                />
                {errors[field.key] ? (
                  <p id={`${field.key}-error`} className="mt-1 text-xs text-destructive">
                    {errors[field.key]}
                  </p>
                ) : null}
              </div>
            ))}

            <div>
              <label htmlFor="tradeType" className="text-sm font-medium text-foreground">
                Trade Type<span className="text-destructive"> *</span>
              </label>
              <select
                id="tradeType"
                name="tradeType"
                className="field mt-1.5"
                value={form.tradeType}
                aria-invalid={Boolean(errors.tradeType)}
                onChange={(event) => set("tradeType", event.target.value)}
              >
                <option value="">Select trade type</option>
                {TRADE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.tradeType ? (
                <p className="mt-1 text-xs text-destructive">{errors.tradeType}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={MAX}
                className="field mt-1.5 resize-y"
                value={form.message}
                onChange={(event) => set("message", event.target.value)}
              />
              {errors.message ? (
                <p className="mt-1 text-xs text-destructive">{errors.message}</p>
              ) : null}
            </div>
          </div>

          <button type="submit" className="btn btn-gold mt-6 w-full sm:w-auto">
            Submit Business Inquiry
          </button>

          {submitted ? (
            <p
              role="status"
              className="mt-4 rounded-xl border border-success/40 bg-success/10 p-3 text-sm text-foreground"
            >
              Thank you — your inquiry has been recorded for this demo and is now visible in the
              admin dashboard.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
