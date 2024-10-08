import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

function ProfileDropdown({ user, setActivePage }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {/* <img
            className="rounded-full h-10 w-10"
            src={user.identities[0].identity_data.picture}
          /> */}
          <span className="px-2 py-1 rounded-md hover:bg-stone-100">{user.email}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setActivePage("settings")}>Profile</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileDropdown;
