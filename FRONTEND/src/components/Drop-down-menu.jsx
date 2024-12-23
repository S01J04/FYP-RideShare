import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dropdown-menu"
import { faArrowDown, faBell, faGear, faRightFromBracket, faRightToBracket, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Link className="flex items-center" href="#">
      <FontAwesomeIcon icon={faUserCircle} size="2x" />
      <FontAwesomeIcon icon={faArrowDown} className="px-1" size="sm" />
    </Link>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Muhammad Sohaib</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut><FontAwesomeIcon icon={faUser}/></DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Notifications
        <DropdownMenuShortcut><FontAwesomeIcon icon={faBell}/></DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut><FontAwesomeIcon icon={faGear}/></DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Log out
        <DropdownMenuShortcut><FontAwesomeIcon icon={faRightToBracket}/></DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Log in
        <DropdownMenuShortcut><FontAwesomeIcon icon={faRightFromBracket}/></DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

  )
}
