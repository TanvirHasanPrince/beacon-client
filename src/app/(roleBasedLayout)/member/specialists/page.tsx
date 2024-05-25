"use client";
import { tailwindPageTitleClass } from "@/components/tailwindClasses";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useDoctorsQuery } from "@/redux/api/doctorApi";
import { capitalizeWords } from "@/utils/helperFunctions";
import Image from "next/image";
import Link from "next/link";

const SpecialistsPage = () => {
  // Fetch member data using user ID
  const { data: doctorsData, isLoading, isError } = useDoctorsQuery({});

  // Loading state
  if (isLoading) {
    return <SpinAnimation />;
  }

  // Error state
  if (isError || !doctorsData) {
    return <div>Error occurred while fetching data.</div>;
  }

  const doctorsDataArray = doctorsData?.data;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Heading */}
      <h1 className={`${tailwindPageTitleClass}`}>List of Specialists</h1>
      {/* Display doctors */}
      <div className="mt-4 px-8">
        {doctorsDataArray &&
          doctorsDataArray.map((doctor: any) => (
            <Link href={`/member/specialists/${doctor.id}`} key={doctor.id}>
              <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-xl p-6 mb-8 w-full max-w-3xl">
                <p className="text-xl mb-2 text-gray-600 font-semi-bold">
                  {doctor.firstName}{" "}
                  {doctor.middleName ? doctor.middleName : ""} {doctor.lastName}
                </p>
                <div className="flex items-center justify-center">
                  <Image
                    src={doctor.profilePhoto}
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    className="w-28 h-auto mr-8"
                    width={250}
                    height={250}
                  />
                  <div className="flex flex-col justify-start">
                    <p className="text-sm mb-2 text-gray-600">
                      <strong>Specializations:</strong>{" "}
                      {capitalizeWords(doctor.specializations)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SpecialistsPage;
