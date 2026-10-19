import { cn } from "cn"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { registerApi } from "@/api/auth.api"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

const loginSchema = z.object({
  email: z.email("please Enter the valid email"),
  password: z.string().min(6, "please Enter the valid password")
  // .regex(/[0-9]/, "Kam se kam ek number ho"),
  ,
  name: z.string(),
  confirmPassword: z.string().min(1, "Confirm password daalo"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "password is not match with confirmPassword!!",
    path: ["confirmPassword"],
  })


export const SignupForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitValue = async (data) => {
    try {
      const res = await registerApi(data)
      toast.success("registeration done successfully!!!")
      navigate("/login", { replace: true })
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")} >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitValue)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" {...register('name')} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  required
                />
                <p>{errors.email?.message}</p>

              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" {...register('password')} required />
                    <p>{errors.password?.message}</p>

                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" {...register('confirmPassword')} required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="http://localhost:5173/register">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
