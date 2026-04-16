"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: Record<string, unknown>) => void
      }
    }
  }
}

export function HubSpotForm() {
  const containerRef = useRef<HTMLDivElement>(null)

  const createForm = () => {
    if (window.hbspt && containerRef.current) {
      containerRef.current.innerHTML = ""
      window.hbspt.forms.create({
        region: "na1",
        portalId: "47294365",
        formId: "288f7534-11de-4963-a0f1-5bd39435c07b",
        target: "#hs-form-target",
      })
    }
  }

  useEffect(() => {
    // If script already loaded (e.g. hot reload), create form immediately
    if (window.hbspt) createForm()
  }, [])

  return (
    <>
      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={createForm}
      />

      {/* Override HubSpot styles to match site design */}
      <style>{`
        #hs-form-target { font-family: inherit; }

        /* Labels */
        #hs-form-target .hs-form-field > label,
        #hs-form-target .hs-form-field > .hs-field-desc {
          display: block !important;
          font-size: 0.7rem !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.08em !important;
          color: #374151 !important;
          margin-bottom: 0.375rem !important;
        }

        /* Inputs, selects, textareas */
        #hs-form-target input[type="text"],
        #hs-form-target input[type="email"],
        #hs-form-target input[type="tel"],
        #hs-form-target input[type="number"],
        #hs-form-target select,
        #hs-form-target textarea {
          width: 100% !important;
          padding: 0.75rem 1rem !important;
          border-radius: 0.75rem !important;
          border: 1px solid #e5e7eb !important;
          background: #ffffff !important;
          color: #111827 !important;
          font-size: 0.875rem !important;
          outline: none !important;
          box-shadow: none !important;
          transition: border-color 0.15s, box-shadow 0.15s !important;
          box-sizing: border-box !important;
          -webkit-appearance: none !important;
          appearance: none !important;
        }

        #hs-form-target input[type="text"]::placeholder,
        #hs-form-target input[type="email"]::placeholder,
        #hs-form-target input[type="tel"]::placeholder,
        #hs-form-target input[type="number"]::placeholder,
        #hs-form-target textarea::placeholder {
          color: #9ca3af !important;
        }

        #hs-form-target input:focus,
        #hs-form-target select:focus,
        #hs-form-target textarea:focus {
          border-color: #4361ee !important;
          box-shadow: 0 0 0 2px rgba(67,97,238,0.40) !important;
        }

        #hs-form-target textarea {
          resize: none !important;
          min-height: 120px !important;
        }

        /* Field wrappers & rows */
        #hs-form-target .hs-form-field { margin-bottom: 1.25rem !important; }
        #hs-form-target fieldset { max-width: 100% !important; border: none !important; padding: 0 !important; }
        #hs-form-target .form-columns-2 {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 1.25rem !important;
        }
        #hs-form-target .form-columns-2 .hs-form-field { width: auto !important; float: none !important; }
        @media (max-width: 640px) {
          #hs-form-target .form-columns-2 { grid-template-columns: 1fr !important; }
        }

        /* Submit button */
        #hs-form-target input[type="submit"],
        #hs-form-target .hs-button {
          width: 100% !important;
          padding: 0.875rem 2rem !important;
          background: #4361ee !important;
          color: #ffffff !important;
          font-size: 0.875rem !important;
          font-weight: 600 !important;
          border-radius: 0.75rem !important;
          border: none !important;
          cursor: pointer !important;
          transition: background 0.15s !important;
          margin-top: 0.5rem !important;
        }
        #hs-form-target input[type="submit"]:hover,
        #hs-form-target .hs-button:hover {
          background: #3451d1 !important;
        }

        /* Errors */
        #hs-form-target .hs-error-msgs {
          list-style: none !important;
          padding: 0 !important;
          margin: 0.25rem 0 0 !important;
        }
        #hs-form-target .hs-error-msgs li label {
          color: #ef4444 !important;
          font-size: 0.75rem !important;
          text-transform: none !important;
          letter-spacing: normal !important;
          font-weight: 400 !important;
        }

        /* GDPR / legal text */
        #hs-form-target .legal-consent-container,
        #hs-form-target .hs-richtext {
          font-size: 0.72rem !important;
          color: #9ca3af !important;
          line-height: 1.5 !important;
        }
        #hs-form-target .legal-consent-container a { color: #4361ee !important; }

        /* Required asterisk */
        #hs-form-target .hs-form-required { color: #ef4444 !important; }

        /* Remove bottom margin on submit row */
        #hs-form-target .hs_submit { margin-top: 0 !important; }
      `}</style>

      <div id="hs-form-target" ref={containerRef} />
    </>
  )
}
