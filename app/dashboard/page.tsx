"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createClient } from '@/utils/supabase/client'
import { Textarea } from '@/components/ui/textarea'
import LoginButton from '../components/LoginLogoutButton'

type Target = {
  id: string
  company_name: string
  contact_name: string
  contact_email: string
  personalization: string
  status: string
  user_id: string
  custom_prompt?: string
}

export default function Dashboard() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [targets, setTargets] = useState<Target[]>([])
  const [form, setForm] = useState({
    id: null as string | null,
    company_name: '',
    contact_name: '',
    contact_email: '',
    personalization: '',
    custom_prompt: '',
    status: 'not_contacted'
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
      } else {
        setUser(data.user)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (user?.id) {
      fetchTargets()
      storeGmailTokens()
    }
  }, [user])

  const fetchTargets = async () => {
    if (!user?.id) return
    const { data, error } = await supabase
      .from('targets')
      .select('*')
      .eq('user_id', user.id)
    if (error) console.error('Error fetching targets:', error)
    setTargets(data || [])
  }

  const storeGmailTokens = async () => {
    const { data: { session } } = await supabase.auth.getSession()
  
    const providerToken = session?.provider_token
    const refreshToken = session?.provider_refresh_token
    const currentUser = session?.user
  
    if (!providerToken || !refreshToken || !currentUser) return
  
    const { data, error } = await supabase.functions.invoke('save-gmail-tokens', {
      body: {
        user_id: currentUser.id,
        email: currentUser.email,
        access_token: providerToken,
        refresh_token: refreshToken,
      },
    })
  
    if (error) {
      console.error('Failed to store Gmail tokens:', error)
    } else {
      console.log('Token storage successful:', data)
    }
  }
  

  const handleSubmit = async () => {
    if (!user?.id) return

    if (form.id) {
      const { error } = await supabase.from('targets').update({
        company_name: form.company_name,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        personalization: form.personalization,
        custom_prompt: form.custom_prompt,
        status: form.status
      }).eq('id', form.id)
      if (error) console.error('Update error:', error)
    } else {
      const { error } = await supabase.from('targets').insert({
        company_name: form.company_name,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        personalization: form.personalization,
        custom_prompt: form.custom_prompt,
        status: form.status,
        user_id: user.id
      })
      if (error) console.error('Insert error:', error)
    }

    setOpen(false)
    setForm({ id: null, company_name: '', contact_name: '', contact_email: '', personalization: '', custom_prompt: '', status: 'not_contacted' })
    fetchTargets()
  }

  const handleDelete = async (id: string) => {
    console.log('Deleting target with id:', id, 'for user:', user?.id)
    const { error } = await supabase.from('targets').delete().eq('id', id)
    if (error) console.error('Delete error:', error)
    fetchTargets()
  }

  async function Automate() {
    const url = process.env.NEXT_PUBLIC_N8N_WEBHOOK!
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
        }),
      })
      const data = await response.json()
      console.log('Automate response:', data)
    } catch (error) {
      console.error('Automate error:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Outreach Dashboard</h1>
        <h1>User Email: {user?.email}</h1>
        <LoginButton />
        <Button onClick={Automate}>Automate</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setForm({ id: null, company_name: '', contact_name: '', contact_email: '', personalization: '', custom_prompt: '', status: 'not_contacted' })}>Add Target</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{form.id ? 'Edit Target' : 'Add New Target'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Company Name"
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              />
              <Input
                placeholder="Contact Name"
                value={form.contact_name}
                onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
              />
              <Input
                placeholder="Contact Email"
                value={form.contact_email}
                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
              />
              <Textarea
                placeholder="Personalization Notes"
                value={form.personalization}
                onChange={(e) => setForm({ ...form, personalization: e.target.value })}
              />
              <Textarea
                placeholder="Custom Prompt for AI (optional)"
                value={form.custom_prompt}
                onChange={(e) => setForm({ ...form, custom_prompt: e.target.value })}
              />
              <Input
                placeholder="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              />
              <Button onClick={handleSubmit}>{form.id ? 'Update' : 'Add'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Personalization</TableHead>
            <TableHead>Custom Prompt</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {targets.map((target) => (
            <TableRow key={target.id}>
              <TableCell>{target.company_name}</TableCell>
              <TableCell>{target.contact_name}</TableCell>
              <TableCell>{target.contact_email}</TableCell>
              <TableCell>{target.personalization}</TableCell>
              <TableCell>{target.custom_prompt || '-'}</TableCell>
              <TableCell>{target.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => {
                    setForm({
                      id: target.id,
                      company_name: target.company_name,
                      contact_name: target.contact_name,
                      contact_email: target.contact_email,
                      personalization: target.personalization,
                      custom_prompt: target.custom_prompt || '',
                      status: target.status
                    })
                    setOpen(true)
                  }}>Edit</Button>
                  <Button size="sm" onClick={() => handleDelete(target.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
