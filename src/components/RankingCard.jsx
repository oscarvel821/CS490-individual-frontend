import React from 'react';

export default function RankingCard(props) {
  const toTitleCase = (word) => {
    const words = word.split(' ');

    const titleCaseWord = words.map((word) => { 
      const lowerCaseWord = word.toLowerCase();
      return lowerCaseWord[0].toUpperCase() + lowerCaseWord.substring(1); 
    })

    return titleCaseWord.join(' ')
  }

  return (
      <div className="rounded-lg bg-[#F8EFE4] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className='mx-auto my-2'>
          {props.icon}
        </div>
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-900">
          {toTitleCase(props.title)}
        </h5>
        <p className="mb-4 text-base text-neutral-600">
            {props.descript}
        </p>
        <button onClick={() => props.handleDetails(props.id)} className='bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded'>More Info</button>
      </div>
  );
}
