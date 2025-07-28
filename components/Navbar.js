// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="flex bg-black text-white p-4 justify-between items-center">
//       <div className="logo font-bold">Amazon Tracker</div>
//       <ul className="flex gap-4">
//         <li>Home</li>
//         <li>About</li>
//         <li>Contact</li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
// components/Navbar.js
'Use Client';

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex bg-black text-white p-4 justify-between items-center">
      <div className="logo font-bold text-xl">Amazon Tracker</div>
      <ul className="flex gap-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

