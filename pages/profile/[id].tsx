import React, { useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import axios from 'axios';

import { GoVerified } from 'react-icons/go';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile: NextPage<IProps> = ({ data }) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);

  const videoList = useMemo(() => {
    return showUserVideos ? userVideos : userLikedVideos;
  }, [showUserVideos, userVideos, userLikedVideos]);

  const videosStyle = useMemo(() => {
    return showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  }, [showUserVideos]);

  const likesStyle = useMemo(() => {
    return !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  }, [showUserVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="md:text-2xl tracking-wide flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(' ', '')}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-xs md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videosStyle}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${likesStyle}`}
            onClick={() => setShowUserVideos(false)}
          >
            Likes
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videoList.length ? (
            videoList.map((post: Video) => (
              <VideoCard post={post} key={post._id} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
