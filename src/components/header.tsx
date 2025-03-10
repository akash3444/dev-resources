import { createClient } from "@/utils/supabase/server";
import LoginButton from "./auth/login-button";
import UserProfileDropdown from "./auth/user-profile-dropdown";
import { SidebarTrigger } from "./ui/sidebar";

const Header = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      {data?.user && !error ? <UserProfileDropdown /> : <LoginButton />}
    </header>
  );
};

export default Header;
