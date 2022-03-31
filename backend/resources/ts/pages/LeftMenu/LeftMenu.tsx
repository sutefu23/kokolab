import React, { Fragment, useState } from "react";
import { NavLink, useLocation  } from "react-router-dom";
import { BsFillBarChartLineFill } from "react-icons/bs"
import { FaTachometerAlt } from "react-icons/fa"
const LeftMenu: React.FC = () => {

    const [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    const location = useLocation();

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                onMouseEnter={() => setLeftMenuVisibility(true)}
                onMouseLeave={() => setLeftMenuVisibility(false)}
                id="collapseMenu"
                >

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon icon-green rotate-n-15">
                        <i className="fas fa-bolt"></i>
                    </div>
                    {
                        leftMenuVisibility &&
                        <div className="sidebar-brand-text mx-3">ココラボ <sup>Admin</sup></div>
                    }
                </a>
                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <NavLink className="nav-link" to="/" title="出荷管理" activeStyle={{ fontWeight: 'bold' }}>
                        <FaTachometerAlt />
                        <span className="ml-1 mt-1 menu-text">出荷管理</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="Reports" title="月次集計" activeStyle={{ fontWeight: 'bold' }}>
                        <BsFillBarChartLineFill />
                        <span className="ml-1 mt-1 menu-text">月次集計</span>
                    </NavLink>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </Fragment>
    );
};

export default LeftMenu;
