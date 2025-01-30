"use client";
import Container from "@/components/ui/container";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("./components/loginForm"), {
  ssr: false,
});

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Container className="flex justify-center">
        <LoginForm />
      </Container>
    </div>
  );
}
