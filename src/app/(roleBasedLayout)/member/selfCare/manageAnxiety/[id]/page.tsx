import React from "react";
import Image from "next/image";
import { anxities } from "./anxieties";

interface Params {
  id: string;
}

const ManageAnxietyDetailsPage: React.FC<{ params: Params }> = ({ params }) => {
  const { id: anxietyId } = params;
  const anxiety = anxities.find(
    (anxiety) => anxiety.id === parseInt(anxietyId, 10)
  );

  if (!anxiety) {
    return <div>Anxiety management technique not found</div>;
  }

  const contentArray = anxiety.content.split("\n");
  const firstPart = contentArray
    .slice(0, Math.ceil(contentArray.length / 2))
    .join("\n");
  const secondPart = contentArray
    .slice(Math.ceil(contentArray.length / 2))
    .join("\n");

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-2xl p-5">
        <h1 className="text-3xl font-bold text-center">{anxiety.title}</h1>
        <Image
          src={anxiety.image1}
          alt="Anxiety Image"
          className="my-4 rounded-2xl"
        />
        <p className="mt-4 text-lg">{firstPart}</p>
        <p className="mt-4 text-lg">{secondPart}</p>
      </div>
    </div>
  );
};

export default ManageAnxietyDetailsPage;
