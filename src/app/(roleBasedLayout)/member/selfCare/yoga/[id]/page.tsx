import React from "react";
import Image from "next/image";
import { yogas } from "./yogas";

interface Params {
  id: string;
}

const YogaDetailsPose: React.FC<{ params: Params }> = ({ params }) => {
  const { id: yogaId } = params;
  const yoga = yogas.find((yoga) => yoga.id === parseInt(yogaId, 10));

  if (!yoga) {
    return <div>Yoga pose details not found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-2xl p-5">
        <h1 className="text-3xl font-bold text-center">{yoga.title}</h1>
        <Image
          src={yoga.image1}
          alt="Yoga Pose Image"
          className="my-4 rounded-2xl"
        />
        <p className="mt-4 text-lg">{yoga.content}</p>
      </div>
    </div>
  );
};

export default YogaDetailsPose;
