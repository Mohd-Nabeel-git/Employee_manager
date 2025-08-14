import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { Sparkles, Users, Settings } from "lucide-react";

const App = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch admin");
          return res.json();
        })
        .then((data) => setAdmin(data))
        .catch((err) => console.error("Error fetching admin:", err));
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <Card className="w-full max-w-3xl shadow-xl border border-border backdrop-blur-md bg-background/80">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2 text-primary">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight">
            {admin
              ? `Welcome, ${admin.name}`
              : <>Welcome to <span className="text-primary">Employee Manager</span></>}
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground text-base">
            {admin
              ? "Manage your team and streamline employee data."
              : "A modern and minimal full-stack employee management app built with MERN + ShadCN UI."}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-lg bg-muted/30">
              <Users className="mx-auto mb-2 text-primary" />
              <p className="font-medium">Manage Employees</p>
            </div>
            <div className="p-4 border rounded-lg bg-muted/30">
              <Settings className="mx-auto mb-2 text-primary" />
              <p className="font-medium">Edit & Update</p>
            </div>
            <div className="p-4 border rounded-lg bg-muted/30">
              <Sparkles className="mx-auto mb-2 text-primary" />
              <p className="font-medium">Modern UI</p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col items-center gap-3">
            <Button asChild size="lg">
              <Link to="/employees">🚀 Launch Dashboard</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using MongoDB, Express, React, Node & ShadCN.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default App;
