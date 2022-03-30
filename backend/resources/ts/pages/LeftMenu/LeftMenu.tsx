import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillBarChartLineFill } from "react-icons/bs"
import { FaTachometerAlt } from "react-icons/fa"
import { Transition } from '@headlessui/react'
const LeftMenu: React.FC = () => {

    const [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
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

                <li className="nav-item active">
                    <Link className="nav-link" to="/" title="出荷管理">
                        <FaTachometerAlt />
                        {
                        leftMenuVisibility &&
                        <span className="ml-1 mt-1">出荷管理</span>
                        }
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="Reports" title="月次集計">
                        <BsFillBarChartLineFill />
                        {
                        leftMenuVisibility &&
                        <span className="ml-1 mt-1">月次集計</span>
                        }
                    </Link>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </Fragment>
    );
};

export default LeftMenu;
