import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import img from '../../assets/profileimg.jpg'
import { useEffect } from "react";

export default function ProfileEdit({ goBack, user }) {
     useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
      }, []);
    return (
        <div className="p-6 min-h-[60dvh]   w-full  max-w-2xl mx-auto">
            <button onClick={goBack} className="text-sm text-heading hover:underline">
                <IoMdCloseCircleOutline size={"2rem"} />
            </button>
            <div className="flex justify-between px-5  items-center gap-4  cursor-pointer     ">
                <div>
                    <h2 className="text-xl text-heading font-semibold">{user?.firstname + " " + user?.lastname}</h2>
                    <span className="text-xs text-gray-500">{user.age} y/o</span>
                </div>
                <div className="flex items-center gap-2">
                    <img
                        src={user?.image || img}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-top object-cover"
                    />

                </div>

            </div>
            <hr className="border-gray-200  border-2 my-3" />
            <div>
                <div className="text-heading px-5 text-lg font-semibold">About {user.lastname}</div>
                {user?.preferences?.map((item, index) => (
                    <div key={index} className="text-subtext py-1 px-5">
                        <strong>{item.category}</strong>: {item.selectedOption}
                    </div>
                ))}
            </div>
            <hr className="border-gray-200  border-2 my-3" />
            <div>
                <div className="text-subtext px-5 ">Member since {user?.createdAt}</div>
            </div>
            <hr className="border-gray-200  border-2 my-3" />

        </div>
    );
}
