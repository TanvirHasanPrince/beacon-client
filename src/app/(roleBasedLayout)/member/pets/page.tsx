import Link from 'next/link'
import React from 'react'

const PetsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      PetsPage
      <Link
      href={'/member/pets/addPet'}
      >
        <button className="bg-red-500 py-4 px-20 text-white">Add Pet</button>
      </Link>
    </div>
  );
}

export default PetsPage