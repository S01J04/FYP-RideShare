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

export function DropdownMenuDemo( { color } ) {
  return (
    <DropdownMenu>
       <Link className="flex items-center" href="#">
  <DropdownMenuTrigger asChild>
   
      <FontAwesomeIcon  style={{
              color: color ,
              transition: "color 0.3s ease-in-out", // Smooth transition for text color
            }}  icon={faUserCircle} size="2x" />

   
  </DropdownMenuTrigger> </Link>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel className="text-lg">Muhammad Sohaib</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup className="flex flex-col gap-2">
    <Link className="cursor-pointer" to={'/users-setting'}>  <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut><FontAwesomeIcon icon={faUser}/></DropdownMenuShortcut>
      </DropdownMenuItem></Link>
      <DropdownMenuItem>
        Inbox
        <DropdownMenuShortcut><FontAwesomeIcon icon={faBell}/></DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup className="flex flex-col gap-2">
      <DropdownMenuItem>
        Log out
        <DropdownMenuShortcut><FontAwesomeIcon icon={faRightToBracket}/></DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link to={'/login'}>Log in</Link>
        <DropdownMenuShortcut><FontAwesomeIcon icon={faRightFromBracket}/></DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

  )
}
