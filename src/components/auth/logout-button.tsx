"use client";

import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: error.message || "Something went wrong",
      });
    }
    window.location.reload();
    setLoading(false);
  };

  return (
    <Button onClick={handleLogout} disabled={loading}>
      Log out
    </Button>
  );
};

export default LogoutButton;
