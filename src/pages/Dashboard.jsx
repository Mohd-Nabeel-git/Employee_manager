import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardHeader, CardTitle, CardContent, CardDescription
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "../components/ui/select";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction
} from "../components/ui/alert-dialog";
import { Trash2, Pencil } from "lucide-react";
import EmployeeCharts from "../components/EmployeeCharts";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/employees`);
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/employees/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEmployees((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" ? true : emp.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "salary-asc":
        return Number(a.salary) - Number(b.salary);
      case "salary-desc":
        return Number(b.salary) - Number(a.salary);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            All your employee records in one place.
          </p>
        </div>
        <Button asChild>
          <Link to="/add">+ Add Employee</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="lg:w-1/3"
        />

        <Select
          onValueChange={(val) => {
            setRoleFilter(val);
            setCurrentPage(1);
          }}
          defaultValue="all"
        >
          <SelectTrigger className="lg:w-1/4">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Developer">Developer</SelectItem>
            <SelectItem value="Designer">Designer</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Intern">Intern</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(val) => {
            setSortOption(val);
            setCurrentPage(1);
          }}
          defaultValue="none"
        >
          <SelectTrigger className="lg:w-1/4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="name-asc">Name (A–Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z–A)</SelectItem>
            <SelectItem value="salary-asc">Salary (Low → High)</SelectItem>
            <SelectItem value="salary-desc">Salary (High → Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* No employees */}
      {!loading && sortedEmployees.length === 0 && (
        <p className="text-muted-foreground text-center mt-10">
          No employees found matching your criteria.
        </p>
      )}

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEmployees.map((emp) => (
          <Card key={emp._id} className="shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{emp.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {emp.email}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline">{emp.role}</Badge>
            </CardHeader>

            <CardContent className="mt-2 flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">
                  Department: <span className="font-medium">{emp.department}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Salary: ₹{emp.salary.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-1"
                >
                  <Link to={`/edit/${emp._id}`}>
                    <Pencil className="w-4 h-4" /> Edit
                  </Link>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the employee record.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-white hover:bg-destructive/90"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Yes, delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
      )}
      {!loading && employees.length > 0 && (
        <EmployeeCharts employees={employees} />
      )}
    </section>
  );
};

export default Dashboard;
