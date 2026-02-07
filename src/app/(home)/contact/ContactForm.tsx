"use client";

import { useEffect, useRef, useState } from "react";

import { useForm } from "@formspree/react";

import type client from "@/../tina/__generated__/client";

import { InputField, SelectInput, TextAreaField } from "./FormInputs";
import { SubmitButton } from "./SubmitButton";
import { SuccessModal } from "./SuccessModal";

// --- TYPE INFERENCE ---
// Drill down: FormConfig Query -> Data -> formConfig -> labels
type LabelsData = NonNullable<
  Awaited<ReturnType<typeof client.queries.formConfig>>["data"]["formConfig"]
>["labels"];

interface ContactFormProps {
  formId?: string | null;
  services?: (string | null)[] | null;
  budgets?: (string | null)[] | null;
  labels?: LabelsData | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm = ({
  formId,
  services,
  budgets,
  labels,
}: ContactFormProps) => {
  const [state, handleSubmit] = useForm(formId || "");
  const formRef = useRef<HTMLFormElement>(null);

  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  // Safe Lists (Filter out nulls)
  const safeServices = services?.filter((s): s is string => !!s) || [];
  const safeBudgets = budgets?.filter((b): b is string => !!b) || [];

  useEffect(() => {
    if (state.succeeded) {
      setTimeout(() => {
        setShowModal(true);
        setService("");
        setBudget("");
        setErrors({});
        if (formRef.current) formRef.current.reset();
      }, 0);
    }
  }, [state.succeeded]);

  const validateAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    if (!formData.get("name")) newErrors.name = "Name is required.";
    const email = formData.get("email") as string;
    if (!email || !EMAIL_REGEX.test(email))
      newErrors.email = "Valid email is required.";
    if (!service) newErrors.service = "Selection required.";
    if (!budget) newErrors.budget = "Selection required.";
    const message = formData.get("message") as string;
    if (!message || message.length < 10)
      newErrors.message = "Message too short.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleSubmit(e);
  };

  return (
    <>
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={labels?.successTitle}
        message={labels?.successMessage}
      />

      <form
        ref={formRef}
        onSubmit={validateAndSubmit}
        className="space-y-8"
        noValidate
      >
        {/* ROW 1 */}
        <div className="grid gap-8 md:grid-cols-2">
          <InputField
            label={labels?.nameLabel || "Your name"}
            name="name"
            placeholder={labels?.namePlaceholder || "Enter your full name"}
            required
            clientError={errors.name}
            formErrors={state.errors}
          />
          <InputField
            label={labels?.emailLabel || "Email address"}
            name="email"
            type="email"
            placeholder={labels?.emailPlaceholder || "email@example.com"}
            required
            clientError={errors.email}
            formErrors={state.errors}
          />
        </div>

        {/* ROW 2 */}
        <div className="grid gap-8 md:grid-cols-2">
          <InputField
            label={labels?.companyLabel || "Company (Optional)"}
            name="company"
            placeholder={labels?.companyPlaceholder || "Your brand name"}
          />
          <InputField
            label={labels?.websiteLabel || "Website (Optional)"}
            name="website"
            placeholder={labels?.websitePlaceholder || "your-site.com"}
          />
        </div>

        {/* ROW 3 */}
        <div className="grid gap-8 md:grid-cols-2">
          <SelectInput
            label={labels?.serviceLabel || "Interested in"}
            name="service"
            options={safeServices}
            value={service}
            onChange={setService}
            clientError={errors.service}
          />
          <SelectInput
            label={labels?.budgetLabel || "Monthly budget"}
            name="budget"
            options={safeBudgets}
            value={budget}
            onChange={setBudget}
            clientError={errors.budget}
          />
        </div>

        {/* ROW 4 */}
        <TextAreaField
          label={labels?.messageLabel || "Your goals"}
          name="message"
          required
          placeholder={
            labels?.messagePlaceholder || "Tell me about your project..."
          }
          clientError={errors.message}
          formErrors={state.errors}
        />

        <div className="pt-6">
          <SubmitButton
            isSubmitting={state.submitting}
            text={labels?.submitText}
          />
        </div>
      </form>
    </>
  );
};
