import Link from "next/link";
import React from "react";

const MemberScheduledConsultationsPage = () => {
  return (
    <div>
      <Link href={"/member/consultations/createConsultation"}>
        <button className="bg-red-500 py-2 px-8 text-white mb-4">
          Consult a doctor
        </button>
      </Link>
      MemberScheduledConsultationsPage
    </div>
  );
};

export default MemberScheduledConsultationsPage;
