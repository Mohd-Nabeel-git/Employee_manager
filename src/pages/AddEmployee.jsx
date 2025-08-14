import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { useEffect } from "react";

const AddEmployee = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // ✅ Sync "Developer" as initial default role
  useEffect(() => {
    setValue("role", "Developer");
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log("✅ onSubmit triggered!", data);
    const payload = {
      ...data,
      salary: Number(data.salary),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Error:", errorText);
        throw new Error("Failed to create employee");
      }

      toast.success("Employee added!");
      navigate("/employees");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="container mx-auto max-w-2xl py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Employee</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                className="mt-2"
                id="name"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                className="mt-2"
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            {/* Role (ShadCN Select + hidden input for RHF) */}
            <div>
              <Label className="mb-2" htmlFor="role">Role</Label>
              <Select
                onValueChange={(val) => setValue("role", val, { shouldValidate: true })}
                value={watch("role")} // ensures value is controlled
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
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
              {/* Required hidden field to register with RHF */}
              <input type="hidden" {...register("role", { required: "Role is required" })} />
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>

            {/* Department */}
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                className="mt-2"
                id="department"
                placeholder="Engineering / Design / HR"
                {...register("department")}
              />
            </div>

            {/* Salary */}
            <div>
              <Label htmlFor="salary">Salary (₹)</Label>
              <Input
                className="mt-2"
                id="salary"
                type="number"
                placeholder="50000"
                {...register("salary", { required: "Salary is required" })}
              />
              {errors.salary && <p className="text-sm text-destructive">{errors.salary.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Employee"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default AddEmployee;
