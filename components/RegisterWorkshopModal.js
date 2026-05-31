'use client'

import { useState } from 'react'
import Modal from './Modal'

export default function RegisterWorkshopModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [openedAt, setOpenedAt] = useState(() => Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setWebsite('')
    setSubmitError('')
    setOpenedAt(Date.now())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        website: website.trim(),
        openedAt,
      })
      resetForm()
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register for The Workshop" size="md" showCloseButton>
      <form name="workshop-registration" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            autoComplete="name"
            className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/80 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            autoComplete="email"
            className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/80 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone number</span>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isSubmitting}
            autoComplete="tel"
            className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/80 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl border-2 border-black shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {submitError ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        ) : null}
      </form>
    </Modal>
  )
}
