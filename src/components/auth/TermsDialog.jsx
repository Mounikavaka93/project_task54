import Modal from "../ui/Modal";

export default function TermsDialog({ open, onClose }) {
  return (
    <Modal open={open} title="Terms & Conditions" onClose={onClose}>
      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Folio Bindery provides this website as a design preview. Creating an account stores your name, email, phone, and password in this browser only. Nothing is sent to a server.
        </p>
        <h3 className="font-medium text-ink">Bookings</h3>
        <p>
          Commissions confirm inside the demo and do not reserve a real book, charge a card, or start a repair.
        </p>
        <h3 className="font-medium text-ink">Conduct</h3>
        <p>
          On a real commission, the bench may refuse a repair that would damage the book. This preview only describes that standard.
        </p>
        <h3 className="font-medium text-ink">Privacy</h3>
        <p>
          Sign out removes the session. Clearing site data removes saved accounts, remembered emails, and newsletter signups. Do not use a password you use elsewhere.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 cursor-pointer text-sm font-medium text-forest underline decoration-copper underline-offset-4"
        >
          Close terms
        </button>
      </div>
    </Modal>
  );
}
