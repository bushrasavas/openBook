import React from "react";
import Profilecard from "./Profilecard";
import Uploadphoto from "./Uploadphoto";
import BookCount from "./BookCount";
import './ProfileStyles.css';

import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { FcPrivacy } from "react-icons/fc";
import { FcFaq } from "react-icons/fc";
import { RiLogoutCircleFill } from "react-icons/ri";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";
import { BiSolidSave } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { MdSell } from "react-icons/md";
import SellForm from "./SellForm";


export default function Profile(){
    return (
        <div className="profile-container">
            <div className="profile-left ">

            <button type="button" className="mt-4 dash-left-button"> <CgProfile className="mr-1" /> Profile</button>
            <button type="button" className="mt-4 dash-left-button"> <ImBooks className="mr-1" /> Borrow List</button>
            <button type="button" className="mt-4 dash-left-button"> <MdSell className="mr-1" /> Selling List</button>
            <button type="button" className="mt-4 dash-left-button"> <IoIosSettings className="mr-1"/> Settings</button>
            <button type="button" className="mt-4 dash-left-button"> <FcPrivacy className="mr-1" /> Privacy</button>
            <button type="button" className="mt-4 dash-left-button"> <FcFaq className="mr-1"/> Faq</button>
            <Link to="/"><button type="button" className="mt-4 dash-left-button"> <RiLogoutCircleFill className="mr-1"/> Log Out</button></Link>
            
            </div>

            <div className="profile-right">
                <div>
				<Profilecard/>
                <Uploadphoto/>
                <div className="mt-5 flex justify-center">
                <button className="save-btn "><BiSolidSave className='mr-1' /> Save</button>

                </div>
                </div>

                <div>
                 <BookCount/>
                 <EditProfile/>
                </div>

                 <div className="col-span-2	">
                <SellForm></SellForm>

                 </div>

            </div>

           
             
        </div>
    )
}