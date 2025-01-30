"use client";
import Container from "@/components/ui/container";
import dynamic from "next/dynamic";
const SignUpForm = dynamic(() => import("./components/signUpForm"), {
  ssr: false,
});
export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Container className="flex justify-center">
        <SignUpForm />
      </Container>
    </div>
  );
}
