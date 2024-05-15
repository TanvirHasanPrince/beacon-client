import type { MenuProps } from "antd";
import {
  TeamOutlined,
  ScheduleOutlined,
  SketchOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string, id: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/myProfile/${id}`}>My Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  const memberSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Manage Account",
      key: "updateAccount",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}/updateAccount`}>Update Account</Link>,
          key: `/${role}/updateAccount`,
        },
      ],
    },
    {
      label: "Event Management",
      key: "events",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}/events`}>All Events</Link>,
          key: `/${role}/events`,
        },
        {
          label: <Link href={`/${role}/createEvent`}>Create Event</Link>,
          key: `/${role}/createEvent`,
        },
      ],
    },
    {
      label: "My Pets",
      key: "pets",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}/pets`}>Pets</Link>,
          key: `/${role}/pet`,
        },
        {
          label: <Link href={`/${role}/createDriver`}>Add Pets</Link>,
          key: `/${role}/addPets`,
        },
      ],
    },
    {
      label: "Doctor Appointments",
      key: "appointment",
      icon: <ScheduleOutlined />,
      children: [
        {
          label: <Link href={`/${role}/schedules`}>Schedules</Link>,
          key: `/${role}/schedules`,
        },
        {
          label: (
            <Link href={`/${role}/bookAppointment`}>Book appointment</Link>
          ),
          key: `/${role}/bookAppointment`,
        },
      ],
    },
    {
      label: "Journal",
      key: "journal",
      icon: <SketchOutlined />,
      children: [
        {
          label: <Link href={`/${role}/journals`}>Journals</Link>,
          key: `/${role}/journals`,
        },
        {
          label: <Link href={`/${role}/createJournal`}>Create Journal</Link>,
          key: `/${role}/createJournal`,
        },
      ],
    },
  ];

  // const memberSidebarItems: MenuProps["items"] = [
  //   ...defaultSidebarItems,
  //   {
  //     label: "Drop off schedule",
  //     key: "schedule",
  //     icon: <ScheduleOutlined />,
  //     children: [
  //       {
  //         label: <Link href={`/${role}/schedules`}>Drop off schedule</Link>,
  //         key: `/${role}/schedule`,
  //       },
  //     ],
  //   },
  // ];

  // const driverSidebarItems: MenuProps["items"] = [
  //   ...defaultSidebarItems,
  //   {
  //     label: "Drop off schedule",
  //     key: "schedule",
  //     icon: <ScheduleOutlined />,
  //     children: [
  //       {
  //         label: <Link href={`/${role}/schedules`}>Drop off schedule</Link>,
  //         key: `/${role}/schedules`,
  //       },
  //     ],
  //   },
  // ];

  if (role === USER_ROLE.MEMBER) return memberSidebarItems;
  // else if (role === USER_ROLE.MEMBER) return employeeSidebarItems;
  // else if (role === USER_ROLE.DOCTOR) return driverSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
