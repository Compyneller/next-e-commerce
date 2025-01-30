"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./spinner";
import { Button } from "./ui/button";

const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/logout");
      if (res.status === 200 && res.data.success) {
        toast.success(res?.data?.message);
        setLoading(false);
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return toast.error(error.response?.data || "An error occurred");
      } else {
        return toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} type="button" onClick={handleLogout} size={"sm"}>
      <Spinner loading={loading} /> Logout
    </Button>
  );
};

export default Logout;
