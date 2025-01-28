import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/redux/hooks/userHooks";
import { faArrowDown, faBell, faGear, faRegistered, faRightFromBracket, faRightToBracket, faSignIn, faSigning, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Correct import for Link

export function DropdownMenuDemo({ color }) {
  const dispatch = useDispatch();
  const { logoutUserAction, isLoading, error } = useLogout();
  const { user } = useSelector((state) => state.user); // Use Redux state directly

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUserAction());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [dispatch, logoutUserAction]);

  const iconStyle = useMemo(() => ({
    color: color,
    transition: "color 0.3s ease-in-out",
  }), [color]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link to="#" className="flex items-center">
          <FontAwesomeIcon style={iconStyle} icon={faUserCircle} size="2x" />
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-lg">{user?.fullName || "Guest"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-2">
        {  user &&  <Link to="user-ridehistory">  <DropdownMenuItem>
            Your rides
            <DropdownMenuShortcut>
              <FontAwesomeIcon icon={faBell} />
            </DropdownMenuShortcut>
          </DropdownMenuItem></Link>}
           {  user &&   <DropdownMenuItem>
            Inbox
            <DropdownMenuShortcut>
              <FontAwesomeIcon icon={faBell} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>}
          {user && <DropdownMenuItem>
            <Link to="/users-profile">
              Profile
            
            </Link>
            <DropdownMenuShortcut>
                <FontAwesomeIcon icon={faUser} />
              </DropdownMenuShortcut>
          </DropdownMenuItem>}
 
       
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-2">
          {user ? (
            <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
              {isLoading ? "Logging out..." : "Log out"}
              <DropdownMenuShortcut>
                <FontAwesomeIcon icon={faRightToBracket} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : <>
            <DropdownMenuItem>
              <Link to="/login">
                {error ? "Login Failed" : "Log in"}
              </Link>
              <DropdownMenuShortcut>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/signup">
                {error ? "Signup  Failed" : "Sign Up"}
              </Link>
              <DropdownMenuShortcut>
                <FontAwesomeIcon icon={faRegistered} />
              </DropdownMenuShortcut>
            </DropdownMenuItem></>
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
