import Container from "../../shared/Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/icons/placeholder.jpg";
import logo from "../../../assets/icons/logo.png";
import HostRequestModal from "../../modal/HostRequestModal";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';
const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // modal handler
  const modalHandler = async () => {
    console.log(`i want to be host`);
   
    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "Requested",
      };

      const { data } = await axiosSecure.put(`/user`, currentUser);
      console.log(data);
      if(data.modifiedCount > 0){
        toast.success(`Success ! please wait for admin confirmation`)
      }else{
        toast.success(`Please wait for admin approval👊`)
      }
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  };

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                width="80"
                height="40"
              />
            </Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Become A Host btn */}
                <div className="hidden md:block">
                  {/* {!user && ( */}
                  <button
                    // disabled={!user}
                    onClick={() => setIsModalOpen(true)}
                    className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                  >
                    Host your home
                  </button>
                  {/* )} */}
                </div>
                {/* modal */}
                <HostRequestModal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  modalHandler={modalHandler}
                />
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition text-[#C43E7E]"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <h2 className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer text-[#C43E7E]">
                          {user?.displayName}
                        </h2>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-bold cursor-pointer text-[#C43E7E]"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logout}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-bold cursor-pointer text-[#C43E7E]"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
