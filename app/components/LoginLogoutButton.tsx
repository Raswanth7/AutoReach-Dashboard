"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import { LogOut } from "lucide-react";



const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);
  if (loading) return null; // or a skeleton/loading spinner
  if (user) {
    return (
      <div
        onClick={async () => {
          await signout();
          setUser(null);
        }}
        className="flex flex-row gap-1 items-center"
      >
        <LogOut className="text-red-500"/>
        <h1 className="text-red-500 font-semibold font-mont">Log out</h1>
      </div>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/auth/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
