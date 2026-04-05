'use client'

import { useState } from 'react'
import Modal from './Modal'

export default function RegisterWorkshopModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() })
    setName('')
    setEmail('')
    setPhone('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register for The Workshop" size="md" showCloseButton>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            autoComplete="tel"
            className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/80 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <button
          type="submit"
          className="mt-2 w-full inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl border-2 border-black shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </Modal>
  )
}
