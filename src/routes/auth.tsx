import { createFileRoute, useNavigate, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ArrowRight, Users } from "lucide-react";
import { authService } from "@/services/authService";
import { loginSchema, signupSchema, forgotSchema } from "@/schemas/employee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { z } from "zod";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in · Employee Management System" },
      { name: "description", content: "Sign in to your Employee Management workspace." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: search.redirect ?? "/dashboard" });
    }
  }, [user, loading, navigate, search.redirect]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <AuroraBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass relative z-10 w-full max-w-md rounded-2xl p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Employee Management</h1>
            <p className="text-xs text-muted-foreground">Sign in to your workspace</p>
          </div>
        </div>

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
            <TabsTrigger value="forgot">Reset</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <SignupForm />
          </TabsContent>
          <TabsContent value="forgot" className="mt-4">
            <ForgotForm />
          </TabsContent>
        </Tabs>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          OR
          <div className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our terms and privacy policy.
        </p>
      </motion.div>
    </div>
  );
}

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <form
      onSubmit={handleSubmit(async (v) => {
        setLoading(true);
        try {
          await authService.signInWithPassword(v.email, v.password);
          toast.success("Welcome back!");
          navigate({ to: "/dashboard" });
        } catch (e) {
          toast.error("Sign in failed", { description: (e as Error).message });
        } finally {
          setLoading(false);
        }
      })}
      className="space-y-3"
    >
      <FieldEmail register={register("email")} error={errors.email?.message as string | undefined} />
      <FieldPassword register={register("password")} error={errors.password?.message as string | undefined} />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="ml-2 h-4 w-4" /></>}
      </Button>
    </form>
  );
}

function SignupForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  return (
    <form
      onSubmit={handleSubmit(async (v) => {
        setLoading(true);
        try {
          await authService.signUp(v.email, v.password);
          toast.success("Check your email to confirm your account.");
        } catch (e) {
          toast.error("Sign up failed", { description: (e as Error).message });
        } finally {
          setLoading(false);
        }
      })}
      className="space-y-3"
    >
      <FieldEmail register={register("email")} error={errors.email?.message as string | undefined} />
      <FieldPassword register={register("password")} error={errors.password?.message as string | undefined} />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
      </Button>
    </form>
  );
}

function ForgotForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotSchema) });

  return (
    <form
      onSubmit={handleSubmit(async (v) => {
        setLoading(true);
        try {
          await authService.forgotPassword(v.email);
          toast.success("Reset link sent to your email.");
        } catch (e) {
          toast.error("Reset failed", { description: (e as Error).message });
        } finally {
          setLoading(false);
        }
      })}
      className="space-y-3"
    >
      <FieldEmail register={register("email")} error={errors.email?.message as string | undefined} />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Have an account? <Link className="text-primary hover:underline" to="/auth">Sign in</Link>
      </p>
    </form>
  );
}

function FieldEmail({ register, error }: { register: ReturnType<ReturnType<typeof useForm>["register"]>; error?: string }) {
  return (
    <div className="space-y-1">
      <Label>Email</Label>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input {...register} type="email" placeholder="you@company.com" className="pl-9" />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function FieldPassword({ register, error }: { register: ReturnType<ReturnType<typeof useForm>["register"]>; error?: string }) {
  return (
    <div className="space-y-1">
      <Label>Password</Label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input {...register} type="password" placeholder="••••••••" className="pl-9" />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function GoogleButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={async () => {
        setLoading(true);
        try {
          await authService.signInWithGoogle();
        } catch (e) {
          toast.error("Google sign in failed", { description: (e as Error).message });
          setLoading(false);
        }
      }}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <GoogleIcon /> <span className="ml-2">Continue with Google</span>
        </>
      )}
    </Button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 3.4 14.7 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 9.5-4.8 9.5-9.7 0-.7-.1-1.2-.2-1.7H12z" />
    </svg>
  );
}

function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute bottom-10 left-0 h-[300px] w-[500px] rounded-full bg-cyan-400/20 blur-3xl" />
    </div>
  );
}
