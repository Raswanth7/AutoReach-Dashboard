"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import React from "react";
import { GrGoogle } from "react-icons/gr";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="bg-orange-500/20 font-mont border-2 border-black/5 transition-all duration-300 hover:bg-orange-500/30 hover:border-orange-300"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <GrGoogle color="orange"/>
      Login with Google
    </Button>
  );
};

export default SignInWithGoogleButton;