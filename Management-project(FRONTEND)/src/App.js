import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Switch,
  useHistory,
} from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";
import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import { useSelector } from "react-redux";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AppContext } from "./ContextHook/AppContext";
import Dashboard from "./pages/Sales/Dashboard/Dashboard";
import CompanyData from "./pages/Sales/Company-Management/CompanyData";
import ClientData from "./pages/Sales/Client-management/ClientData";
import InventoryData from "./pages/Sales/Inventory-Management/InventoryData";
import CustomerData from "./pages/Sales/User-Management/CustomerData";
import Supplier from "./pages/Sales/Supplier/Supplier";
// import CustomerData from "./pages/Sales/Customer-Management/CustomerData";

const App = () => {
  const [roles, setRoles] = useState(0);
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(true);
  const { staticMenuInactive, setStaticMenuInactive } = useContext(AppContext);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const { onMenuItemClickContext, setOnMenuItemClickContext } = useContext(
    AppContext
  );
  const copyTooltipRef = useRef();
  const location = useLocation();
  const isLoading = useSelector((state) => state?.utilitySlice?.isLoading);
  // const auth = useSelector((state) => state?.authenticationSlice?.token);
  const auth = true;

  // const roles = localStorage.getItem("role") || 'super-admin';

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    setOnMenuItemClickContext(event?.item?.label);
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const storedLoginRes = JSON.parse(localStorage.getItem("loginRes"));
  const userTypeIs = storedLoginRes?.userType;
  const userTypeId = storedLoginRes?._id;

  const superAdminMenu = [
    {
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-list",
          to: "/dashbaord",
        },
        {
          label: "Member Management",
          icon: "pi pi-fw pi-list",
          to: "/company",
        },
        {
          label: "Plots Management",
          icon: "pi pi-fw pi-list",
          to: "/Inventory",
        },
        {
          label: "Ledgers Management",
          icon: "pi pi-fw pi-list",
          to: "/client",
        },
        {
          label: "Notifications",
          icon: "pi pi-fw pi-list",
          to: "/Supplier",
        },
        {
          label: "Password Reset",
          icon: "pi pi-fw pi-list",
          to: "/user",
        },
      ],
    },
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });

  //   LoadingOverlay.propTypes = undefined;

  const history = useHistory();

  // Logout on Inactivity

  // Create a ref to store the interval ID
  const intervalRef = useRef();

  // Set up a function that checks the time since the user's last activity
  // and logs the user out if they have been inactive for too long
  function checkActivity() {
    if (
      localStorage.getItem("login") === false ||
      localStorage.getItem("login") === null
    ) {
      return;
    }
    console.log("here");
    const lastActive = localStorage.getItem("lastActive");
    const elapsed = Date.now() - lastActive;

    if (elapsed > 1800000) {
      // 5 minutes in milliseconds
      localStorage.removeItem("lastActive");
      localStorage.removeItem("login");
      localStorage.removeItem("user");
      history.push("/");
      window.location.reload();
      clearInterval(intervalRef.current);
    }
  }

  // Set up an interval to run the checkActivity function every minute
  useEffect(() => {
    intervalRef.current = setInterval(checkActivity, 1800000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Update the user's last active time whenever they interact with the page
  useEffect(() => {
    function handleActivity() {
      localStorage.setItem("lastActive", Date.now());
    }
    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("keypress", handleActivity);

    return () => {
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("keypress", handleActivity);
    };
  }, []);

  const [authenticated, setAuthenticated] = useState(false); // Add authentication state

  // Callback function to set the authentication state when the user logs in
  const handleLoginSuccess = () => {
    setAuthenticated(true);

  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token!=null) {
      // You should also check if the token is valid (not expired) here
      setAuthenticated(true);
      history.push("/dashboard");
      
    }
  }, []);

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      {/* <LoadingOverlay active={isLoading} spinner text="Loading ..."> */}
      <ToastContainer />
      <Tooltip
        ref={copyTooltipRef}
        target=".block-action-copy"
        position="bottom"
        content="Copied to clipboard"
        event="focus"
      />

      {/* Use the authentication state to conditionally render components */}
      {authenticated ? ( // If authenticated, render the app components
        <>
          <AppTopbar
            position={"relative"}
            onToggleMenuClick={onToggleMenuClick}
            layoutColorMode={layoutColorMode}
            mobileTopbarMenuActive={mobileTopbarMenuActive}
            onMobileTopbarMenuClick={onMobileTopbarMenuClick}
            onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
          />
          <div className="layout-sidebar" onClick={onSidebarClick}>
            <AppMenu
              model={
                superAdminMenu
                // roles === "employee" ? menu : roles === "department manager" ?
                // managerMenu : roles === "hr manager" ? hrMenu : superAdminMenu
              }
              onMenuItemClick={onMenuItemClick}
              layoutColorMode={layoutColorMode}
            />
          </div>
          <div className="layout-main-container innr-Body">
            <div className="layout-main">
              <Switch>
            
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/user" exact component={CustomerData} />
                <Route path="/client" exact component={ClientData} />
                <Route path="/company" exact component={CompanyData} />
                <Route path="/Inventory" exact component={InventoryData} />
                <Route path="/Supplier" exact component={Supplier} />
                {/* Add more routes as needed */}
              </Switch>
            </div>
            {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
          </div>
        </>
      ) : (
        // If not authenticated, render the Login component
        <Route path="/login" >
          <Login onLoginSuccess={handleLoginSuccess} />
        </Route>
      )}

      <AppConfig
        rippleEffect={ripple}
        onRippleEffect={onRipple}
        inputStyle={inputStyle}
        onInputStyleChange={onInputStyleChange}
        layoutMode={layoutMode}
        onLayoutModeChange={onLayoutModeChange}
        layoutColorMode={layoutColorMode}
        onColorModeChange={onColorModeChange}
      />

      <CSSTransition
        classNames="layout-mask"
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>
      {/* </LoadingOverlay> */}
    </div>
  );
};

export default App;
