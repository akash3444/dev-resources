"use client";

import { useUser } from "@/contexts/user-context";
import { createClient } from "@/utils/supabase/client";
import { LogOutIcon, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserProfileDropdown = () => {
  const userData = useUser();
  const userMetadata = userData?.data?.user?.user_metadata;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarFallback className="border">
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
          <AvatarImage
            src={userMetadata?.avatar_url ?? userMetadata?.picture}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarFallback className="border">
              <UserRound className="h-5 w-5" />
            </AvatarFallback>
            <AvatarImage
              src={userMetadata?.avatar_url ?? userMetadata?.picture}
            />
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-medium">
              {userMetadata?.name ?? userMetadata?.full_name}
            </span>
            <span>{userMetadata?.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3" onClick={handleLogout}>
          <LogOutIcon /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
