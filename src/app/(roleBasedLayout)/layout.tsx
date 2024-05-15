"use client";
import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { ConfigProvider } from "antd";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
  }, [router, userLoggedIn]);

  return (
    <ConfigProvider>
      <Layout hasSider>
        <Sidebar />
        <Contents>{children}</Contents>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
