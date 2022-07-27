import React from 'react';

import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt = true }: { items: string[]; mt?: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2  ${mt && 'mt-5'}`}>
      {items.map((item) => (
        <p
          key={item}
          className="text-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} />
      <List items={footerList3} />
      <p className="text-gray-400 text-sm mt-5">
        {new Date().getFullYear()} TikTik
      </p>
    </div>
  );
};

export default Footer;
