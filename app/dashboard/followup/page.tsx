"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge";

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
              <TableCell>{typeof target.replied === 'boolean' ? (target.replied ? 'Yes' : 'No') : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}