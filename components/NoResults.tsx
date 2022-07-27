import React from 'react';
import { NextPage } from 'next';
import { MdOutlineVideocamOff, MdAccountCircle } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';

interface IProps {
  text: string;
  option?: 'video' | 'comment' | 'account';
}

const NoResults: NextPage<IProps> = ({ text, option = 'video' }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full ">
      <p className="text-8xl">
        {option === 'video' && <MdOutlineVideocamOff />}
        {option === 'comment' && <BiCommentX />}
        {option === 'account' && <MdAccountCircle />}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
