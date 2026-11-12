import React, { useState } from 'react';
import { ChevronLeft, Shield, FileText, Lock, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy';

interface LegalModalProps {
  isOpen: boolean;
  initialDoc?: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialDoc = 'terms',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialDoc);
    }
  }, [isOpen, initialDoc]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 select-none">
      {/* Native App Top Navigation Bar */}
      <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 sticky top-0 z-10">
        <button
          onClick={onClose}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
          <span className="text-xs font-semibold text-slate-700">Back</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-slate-900 leading-tight">
            {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
          </h1>
          <p className="text-[10px] text-slate-400 font-medium">Effective June 2026</p>
        </div>

        <button
          onClick={onClose}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>

      {/* Segmented Control / Tab Switcher */}
      <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 shrink-0">
        <div className="bg-slate-200/70 p-1 rounded-xl flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
        </div>
      </div>

      {/* Scrollable Document Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 text-xs text-slate-600 flex flex-col gap-5 leading-relaxed font-normal">
        {activeTab === 'terms' ? (
          <>
            {/* Scope Notice Banner */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-amber-900 text-xs">
              <span className="font-bold block mb-1">Notice of Scope & Regulatory Status</span>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Noted is an immutable peer-to-peer record-keeping and mutual commitment tracking platform.
                Noted is neither a bank, non-banking financial company (NBFC), financial intermediary,
                nor a debt collection agency. Noted does not hold, lend, or transfer funds on behalf of any user.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                1. Platform Purpose & Agreement
              </h2>
              <p>
                Noted ("the Platform") is a technology utility designed to help individuals record,
                organize, and digitally verify mutual commitments ("Vaadas") such as friendly borrowings,
                payment promises, advance payments, and service agreements.
              </p>
              <p className="mt-2">
                By accessing or using Noted, you agree to comply with and be bound by these Terms of Service.
                If you do not agree, please do not use the service.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                2. Identity & Account Verification
              </h2>
              <p>
                To maintain mutual trust across commitments, users must register with a valid, active mobile
                number verified via One-Time Passcode (OTP). Higher-value Vaadas may require additional
                verification tiers (Level 2 Aadhaar, Level 3 PAN). You agree to provide true, accurate, and complete
                information when establishing your identity profile.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                3. Creation & Mutual Acceptance of Vaadas
              </h2>
              <p>
                A Vaada created by one party remains in a "Pending Review" status until the specified
                counterparty actively reviews and digitally accepts the terms. No commitment is marked active
                without affirmative mutual consent. Upon mutual acceptance, a unique immutable Vaada ID is assigned
                with an auditable timeline log.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                4. Recording Repayments & Settlement
              </h2>
              <p>
                When a repayment or service milestone is completed, the payer records the date, mode of
                payment (e.g. UPI, Bank Transfer, Cash), and optional transaction reference or receipt.
                The receiving party must verify and confirm receipt before the Vaada is officially marked as settled.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                5. Dispute Resolution & Legal Evidentiary Value
              </h2>
              <p>
                Records created on Noted constitute digital acknowledgments between private parties.
                They serve as documented evidence of mutual consensus pursuant to Section 65B of the Indian
                Evidence Act, 1872 and the Information Technology Act, 2000. In case of discrepancies, the
                immutable timeline log serves as primary evidence of agreed terms.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                6. Permitted Use & Prohibited Conduct
              </h2>
              <p>
                You agree not to use Noted for illegal lending activities, usury, predatory interest rates,
                fraud, extortion, or harassment. Noted reserves the right to suspend or terminate accounts that
                violate these standards.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Privacy Highlight Banner */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 text-emerald-900 text-xs">
              <span className="font-bold block mb-1">Data Privacy Commitment</span>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                Your financial commitments and personal data are strictly private between you and your verified
                counterparties. Noted never sells your personal information or shares loan amounts with credit bureaus
                without your explicit, affirmative consent.
              </p>
            </div>

            {/* Privacy Section 1 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                1. Information We Collect
              </h2>
              <p>
                We collect personal information necessary to verify identity and maintain audit logs:
              </p>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-600">
                <li><span className="font-semibold text-slate-800">Account Data:</span> Mobile number, full name, profile photo, and optional address details.</li>
                <li><span className="font-semibold text-slate-800">Commitment Records:</span> Counterparty name, principal amount, due date, payment receipts, and category.</li>
                <li><span className="font-semibold text-slate-800">Device & Security Logs:</span> Timestamped OTP verification sessions and device identifiers for tamper prevention.</li>
              </ul>
            </div>

            {/* Privacy Section 2 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                2. How Your Information is Shared
              </h2>
              <p>
                Your commitment terms are disclosed exclusively to the designated counterparty invited to
                the Vaada. Counterparties can see your registered name and masked contact information to verify
                the agreement.
              </p>
            </div>

            {/* Privacy Section 3 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                3. Bank Account & Payment Details
              </h2>
              <p>
                Noted does not store your net banking credentials, debit card numbers, or UPI PINs. Any payment
                screenshots or UTR reference numbers uploaded during repayment recording are stored strictly as
                evidentiary attachments accessible only to the parties involved.
              </p>
            </div>

            {/* Privacy Section 4 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                4. Data Security & Encryption
              </h2>
              <p>
                All sensitive records, verification tokens, and transaction proofs are encrypted in transit
                (TLS 1.3) and at rest using AES-256 standards. Critical authorization actions require active 2FA
                OTP verification.
              </p>
            </div>

            {/* Privacy Section 5 */}
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-1.5">
                5. Your Rights & Account Deletion
              </h2>
              <p>
                You have the right to inspect your stored personal data, edit your profile information, and
                request account deletion once all active Vaadas have been settled and closed.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Sticky Bottom Action Footer */}
      <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Legally Verified Protocol</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="h-10 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};
