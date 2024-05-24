"use client";
import React, { useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getUserInfo } from "@/services/auth.service";

interface Params {
  id: string;
}

const MeetingRoomPageForUser = ({ params }: { params: Params }) => {
  const { id: roomId } = params;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { firstName, lastName } = getUserInfo() as any;
  const userName = firstName + " " + lastName;

  console.log(userName);

  useEffect(() => {
    const myMeeting = async () => {
      const appId = 539364425;
      const serverSecret = `${process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET}`;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        userName
      );
      const meetingLink = `${process.env.NEXT_PUBLIC_BROWSER_URL}/meetingRoom/${roomId}`;

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        showPreJoinView: false,
        container: containerRef.current,
        sharedLinks: [{ name: "Copy Link", url: meetingLink }],
        scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      });
    };

    if (containerRef.current) {
      myMeeting();
    }
  }, [roomId]);

  return (
    <div
      ref={containerRef}
      className="w-screen "
      style={{ width: "100vw", height: "90vh" }}
    />
  );
};

export default MeetingRoomPageForUser;
