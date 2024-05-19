import React from "react";
import Image from "next/image";
import { stories } from "./stories";

interface Params {
  id: string;
}

const StoryDetailsPage: React.FC<{ params: Params }> = ({ params }) => {
  const { id: storyId } = params;
  const story = Object.values(stories).find(
    (story) => story.id === parseInt(storyId)
  );

  if (!story) {
    return <div>Story not found</div>;
  }

  const contentArray = story.content.split("\n");
  const firstPart = contentArray
    .slice(0, Math.ceil(contentArray.length / 2))
    .join("\n");
  const secondPart = contentArray
    .slice(Math.ceil(contentArray.length / 2))
    .join("\n");

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-2xl p-5">
        <h1 className="text-3xl font-bold text-center">{story.title}</h1>
        <Image src={story.image1} alt="Seed 1" className="my-4 rounded-2xl" />
        <p className="mt-4 text-lg">{firstPart}</p>
        {story.image2 && (
          <Image src={story.image2} alt="Seed 2" className="my-4 rounded-2xl" />
        )}
        <p className="mt-4 text-lg">{secondPart}</p>
        {story.image3 && (
          <Image src={story.image3} alt="Seed 3" className="my-4 rounded-2xl" />
        )}
      </div>
    </div>
  );
};

export default StoryDetailsPage;
