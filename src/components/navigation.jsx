import React from "react";
import { Link } from "react-router-dom";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            QuadForm Software
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#features" className="page-scroll">Features</a></li>
            <li><a href="#about" className="page-scroll">เกี่ยวกับเรา</a></li>
            <li><a href="#services" className="page-scroll">การบริการ</a></li>
            <li><a href="#portfolio" className="page-scroll">ผลงาน</a></li>
            <li><a href="#testimonials" className="page-scroll">ลูกค้า</a></li>
            <li><a href="#team" className="page-scroll">ทีม</a></li>
            <li><a href="#contact" className="page-scroll">ติดต่อ</a></li>
            <li><Link to="/login" className="page-scroll">เข้าสู่ระบบ</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
