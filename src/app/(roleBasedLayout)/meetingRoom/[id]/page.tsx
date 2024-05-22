"use client";
import React, { useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface Params {
  id: string;
}

const MeetingRoomPageForUser = ({ params }: { params: Params }) => {
  const { id: roomId } = params;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appId = 539364425;
      const serverSecret = `2efdafe9501b8420eb75a1a00668c413`;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Beacon"
      );
      const meetingLink = `${process.env.NEXT_PUBLIC_BROWSER_URL}/meetingRoom/${roomId}`;
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
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
      className="w-screen h-screen "
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default MeetingRoomPageForUser;
