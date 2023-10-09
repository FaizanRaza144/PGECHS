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
        history.push("/");
        // window.location.reload();
    }

    useEffect(() => {
        const storedLoginRes = JSON.parse(localStorage.getItem('loginRes'));
        const userName = `${storedLoginRes?.firstName.charAt(0).toUpperCase() + storedLoginRes?.firstName.slice(1)} ${storedLoginRes?.lastName.charAt(0).toUpperCase() + storedLoginRes?.lastName.slice(1)}`
        setUserName(userName)
    }, []);

    return (
        <>
            <div className="layout-topbar">

                {/* <Link to="/" className="layout-topbar-logo">
                    <img src={props.layoutColorMode === "light" ? "assets/layout/images/Zindigi.png" : "assets/layout/images/Zindigi.png"} alt="logo" />
                    <span className="project-name">Zindigi Portal</span>
                </Link> */}

                <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                    <h1 className=" mr-4" >PGECHS</h1>
                    <i className="pi pi-bars ml-4 mb-2" />
                </button>

                {/* <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                    <i className="pi pi-ellipsis-v" />
                </button> */}

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

                {/* <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                    <li>
                        <button className="p-link layout-topbar-button mx-4" onClick={props.onMobileSubTopbarMenuClick}>
                            <label htmlFor="" className="font-semibold">
                                {userName}
                            </label>
                        </button>
                    </li>

                    <li className="flex">
                        <button className="p-link layout-topbar-button user-image" onClick={() => {
                            handleLogOut();
                        }}>
                            <i className="pi pi-power-off"></i>
                        </button>
                    </li>
                </ul> */}

            </div>

        </>
    );
};
