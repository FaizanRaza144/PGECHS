import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./AppTopbar.scss";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "./ContextHook/AppContext";

export const AppTopbar = (props) => {

    const [userName, setUserName] = useState([])
    const { onMenuItemClickContext } = useContext(AppContext)

    const op = useRef(null);
    const history = useHistory();
    // const dispatch = useDispatch();

    // const UserName = window.localStorage.getItem("user").first_name;
    // const userName = useSelector((state) => state.authenticationSlice.user);

    const handleLogOut = () => {
        window.localStorage.clear();
        history.push("/login");
         window.location.reload('/login');
    }

    useEffect(() => {
        const storedLoginRes = JSON.parse(localStorage.getItem('loginRes'));
        const userName = `${storedLoginRes?.firstName.charAt(0).toUpperCase() + storedLoginRes?.firstName.slice(1)} ${storedLoginRes?.lastName.charAt(0).toUpperCase() + storedLoginRes?.lastName.slice(1)}`
        setUserName(userName)
    }, []);

    return (
        <>
            <div className="layout-topbar">

               

                <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                    <h1 className=" mr-4" >PGECHS</h1>
                    <i className="pi pi-bars ml-4 mb-2" />
                </button>

              

                <div className="pms-topbar">

                    <div className="flex align-items-center">
                        {/* <h6 className="mb-0">{userName}</h6> */}
                        <button className="p-link layout-topbar-button mx-4" onClick={() => {
                            handleLogOut();
                        }}>
                            <i className="pi pi-power-off"></i>
                        </button>
                    </div>
                </div>


            </div>

        </>
    );
};
