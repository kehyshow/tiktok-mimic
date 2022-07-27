import React, { useMemo, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import { GoVerified } from 'react-icons/go';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import useAuthStore from '../../store/authStore';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  videos: Video[];
}

const Search: NextPage<IProps> = ({ videos }) => {
  const [isAccounts, setIsAccounts] = useState(true);

  const router = useRouter();
  const { searchTerm } = router.query;

  const { allUsers } = useAuthStore();
  const searchedAccounts = useMemo(() => {
    return allUsers.filter((user: IUser) =>
      user.userName
        .toLocaleLowerCase()
        .includes((searchTerm as string).toLowerCase())
    );
  }, [searchTerm, allUsers]);

  const accountStyle = useMemo(() => {
    return isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  }, [isAccounts]);

  const videoStyle = useMemo(() => {
    return !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  }, [isAccounts]);

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accountStyle}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${videoStyle}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length ? (
            searchedAccounts.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className="flex gap-3 cursor-pointer p-2 font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                    />
                  </div>
                  <div className="hidden xl:block">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              text={`No accounts results for '${searchTerm}'`}
              option="account"
            />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((post) => <VideoCard post={post} key={post._id} />)
          ) : (
            <NoResults text={`No video results for '${searchTerm}'`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
