// src/components/Navbar/ProfileDropdown.jsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function ProfileDropdown() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="DropdownTrigger" aria-label="User Menu">
                <User size={26} color="white" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="DropdownContent" sideOffset={10}>
                <DropdownMenu.Item className="DropdownItem" onClick={() => navigate("/dashboard")}>
                    Dashboard
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownItem" onClick={() => navigate("/favorites")}>
                    Favorites
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownSeparator" />
                <DropdownMenu.Item className="DropdownItem logout" onClick={handleLogout}>
                    Logout
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}

export default ProfileDropdown;
