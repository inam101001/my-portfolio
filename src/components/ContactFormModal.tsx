import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2, X } from "lucide-react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "success" | "error";

function getEmailJsErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "text" in error) {
    const text = (error as { text: unknown }).text;
    if (typeof text === "string" && text.length > 0) return text;
  }
  if (error instanceof Error) return error.message;
  return "Unexpected error.";
}

export function ContactFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const nameFieldId = useId();
  const emailFieldId = useId();
  const messageFieldId = useId();
  const headingId = useId();

  const closeModal = () => {
    setIsOpen(false);
    setStatus("idle");
    setErrorMessage("");
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    nameFieldRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      formRef.current.reset();
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(getEmailJsErrorMessage(error));
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="button"
        onClick={() => setIsOpen(true)}
      >
        Send email <ArrowUpRight aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="contact-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            ref={modalRef}
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
          >
            <div className="contact-modal-head">
              <h3 id={headingId}>Send a message</h3>
              <button
                type="button"
                className="contact-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            {status === "success" ? (
              <div className="contact-modal-status contact-modal-status--success">
                <p>Message sent. I’ll get back to you soon.</p>
                <button type="button" className="button" onClick={closeModal}>
                  Close
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-modal-form" noValidate>
                <label htmlFor={nameFieldId}>
                  Name
                  <input
                    ref={nameFieldRef}
                    id={nameFieldId}
                    name="user_name"
                    type="text"
                    autoComplete="name"
                    required
                  />
                </label>

                <label htmlFor={emailFieldId}>
                  Email
                  <input
                    id={emailFieldId}
                    name="user_email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>

                <label htmlFor={messageFieldId}>
                  Message
                  <textarea id={messageFieldId} name="message" rows={5} required />
                </label>

                {status === "error" && (
                  <p className="contact-modal-status contact-modal-status--error">
                    Failed to send. {errorMessage}
                  </p>
                )}

                <button type="submit" className="button" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <Loader2 aria-hidden="true" className="contact-modal-spinner" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message <ArrowUpRight aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
