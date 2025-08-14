import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ModeToggle from "./mode-toggle";
import { Briefcase } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/employees", label: "Dashboard" },
    { to: "/add", label: "Add Employee" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Employee Manager</h1>
        </div>

        {/* Nav links + Auth */}
        <nav className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Button
              key={link.to}
              variant={pathname === link.to ? "default" : "ghost"}
              asChild
              className={`transition-all ${
                pathname === link.to ? "scale-105" : "hover:underline"
              }`}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}

          {/* Auth Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hover:bg-primary/10">
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {token ? (
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="w-full">
                      Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
