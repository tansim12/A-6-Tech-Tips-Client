"use client";

import { privateRotes } from "@/src/Constant/global.const";
import { useUser } from "@/src/Context/user.context";
import { logoutFn } from "@/src/Service/Auth/auth.service";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { usePathname, useRouter } from "next/navigation";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const { user, setIsLoading: userSetLoading } = useUser();
  console.log({ user });

  return (
    <>
      {user?.email ? (
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              className="cursor-pointer border-base border-2"
              // name={user?.name ? user?.name : "user"}

              src={
                user?.profilePhoto
                  ? user?.profilePhoto
                  : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={() => handleNavigation("/profile")}>
              Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => handleNavigation(`/${user?.role}/dashboard`)}
            >
              Dashboard
            </DropdownItem>
            
            <DropdownItem
              onClick={() => {
                logoutFn();
                userSetLoading(true);
                if (privateRotes?.some((route: any) => route === pathname)) {
                  router.push("/");
                }
              }}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button onClick={() => handleNavigation("/login")}>Login</Button>
      )}
    </>
  );
}
