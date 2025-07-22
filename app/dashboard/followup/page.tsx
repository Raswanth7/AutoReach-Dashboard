"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { toast } from "sonner";

// Target type as in automate page
 type Target = {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  personalization: string;
  status: string;
  user_id: string;
  custom_prompt?: string;
  allow_followup?: boolean;
  replied?: boolean;
};

export default function FollowupDashboard() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [targets, setTargets] = useState<Target[]>([]);
  const [search, setSearch] = useState("");

  // Filtered targets based on search
  const filteredTargets = targets.filter((target) => {
    const q = search.toLowerCase();
    return (
      target.company_name.toLowerCase().includes(q) ||
      target.contact_name.toLowerCase().includes(q) ||
      target.contact_email.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchTargets();
    }
  }, [user]);

  async function Automate() {
    const url = process.env.NEXT_PUBLIC_N8N_WEBHOOK_FOLLOWUP!
    toast("Followup workflow started");
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

  const fetchTargets = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from("targets")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "contacted")
      .eq("allow_followup", true);
    if (!error) setTargets(data || []);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold" onClick={()=>console.log(targets)}>Followup Dashboard</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by company, contact, or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="min-w-md"
            />
                          <div 
            className='cursor-pointer border-1 border-black/5 hover:bg-orange-400/80 rounded-lg items-center flex gap-1 px-2 bg-orange-400 [background-image:radial-gradient(88%_100%_at_bottom,rgba(255,255,255,0.5),rgba(255,255,255,0))]'
            onClick={Automate}
            >
              <Settings size={20}/>
              <h1 className='font-medium'>Followup</h1>
              </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>Personalization</TableHead> */}
            {/* <TableHead>Followup Enabled</TableHead> */}
            <TableHead>Replied</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTargets.map((target) => (
            <TableRow key={target.id}>
              <TableCell>{target.company_name}</TableCell>
              <TableCell>{target.contact_name}</TableCell>
              <TableCell>{target.contact_email}</TableCell>
              {/* <TableCell>{target.personalization}</TableCell> */}
              {/* <TableCell>{typeof target.allow_followup === 'boolean' ? (target.allow_followup ? 'Yes' : 'No') : '-'}</TableCell> */}
              <TableCell>
                <Badge className={`${target.replied ? 'bg-green-500' : 'bg-red-500'}`}> {typeof target.replied === 'boolean' ? (target.replied ? 'Yes' : 'No') : '-'}
                </Badge>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}