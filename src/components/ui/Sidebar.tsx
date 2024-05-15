"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { getUserInfo } from "@/services/auth.service";
import { sidebarItems } from "@/constants/SidebarItems";

const { Sider } = Layout;

const Sidebar = () => {
  //get role
  const { role, id } = getUserInfo() as any;
  // console.log(role);
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  return (
    <div>
      <Sider
        style={{
          minHeight: "100vh",
          overflow: "auto",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(238,238,238,1) 0%, rgba(228,213,228,1) 95%, rgba(231,222,232,1) 100%, rgba(235,0,255,0.9864320728291317) 100%)",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={collapsed ? 80 : 180}
      >
        <div
          style={{
            color: "red",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {collapsed ? "" : "Beacon"}
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role, id)}
          style={{
            color: "red",
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(238,238,238,1) 0%, rgba(228,213,228,1) 95%, rgba(231,222,232,1) 100%, rgba(235,0,255,0.9864320728291317) 100%)",
          }}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
