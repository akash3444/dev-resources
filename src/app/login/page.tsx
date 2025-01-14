"use client";

import { GithubLogo, GoogleLogo } from "@/components/icons";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { Provider } from "@supabase/supabase-js";

const LoginPage = () => {
  const supabase = createClient();

  const handleLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        title: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-xs flex-col items-center rounded-xl">
        <Logo className="h-10 w-10 [&>svg]:h-6 [&>svg]:w-6" />
        <div className="mt-4 font-medium">Log in to Dev Resources</div>
        <div className="mt-12 space-y-3">
          <Button onClick={() => handleLogin("google")} className="w-full">
            <GoogleLogo className="mr-1 !h-5 !w-5" /> Log in with Google
          </Button>
          <Button onClick={() => handleLogin("github")} className="w-full">
            <GithubLogo className="mr-1 !h-5 !w-5" />
            Log in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
