import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch existing data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/employees/${id}`);
        const data = await res.json();
        if (res.ok) {
          reset(data); // fills form
        } else {
          toast.error("Employee not found");
          navigate("/employees");
        }
      } catch (err) {
        toast.error("Error fetching data");
      }
    };
    fetchEmployee();
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      salary: Number(data.salary),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update employee");

      toast.success("Employee updated!");
      navigate("/employees");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="container mx-auto max-w-2xl py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Employee</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input className="mt-2" id="name" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input className="mt-2" type="email" id="email" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            {/* Role */}
            <div>
              <Label className="mb-2" htmlFor="role">Role</Label>
              <Select
                defaultValue=""
                onValueChange={(val) => setValue("role", val, { shouldValidate: true })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Intern">Intern</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register("role", { required: "Role is required" })} />
            </div>

            {/* Department */}
            <div>
              <Label htmlFor="department">Department</Label>
              <Input className="mt-2" id="department" {...register("department")} />
            </div>

            {/* Salary */}
            <div>
              <Label htmlFor="salary">Salary (₹)</Label>
              <Input
                className="mt-2"
                id="salary"
                type="number"
                {...register("salary", { required: "Salary is required" })}
              />
              {errors.salary && <p className="text-sm text-destructive">{errors.salary.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Employee"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditEmployee;
