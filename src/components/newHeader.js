import React, { useEffect } from "react"
import closeIcon from "../images/close.svg"
import logo from "../images/logo-n.png"
import { Link } from "gatsby"
import { slugify } from "../utils/slugifyFormatter"

const NewHeader = () => {
  useEffect(() => {
    ;(() => {
      const openNavMenu = document.querySelector(".open-nav-menu"),
        closeNavMenu = document.querySelector(".close-nav-menu"),
        navMenu = document.querySelector(".nav-menu"),
        menuOverlay = document.querySelector(".menu-overlay"),
        mediaSize = 991

      openNavMenu.addEventListener("click", toggleNav)
      closeNavMenu.addEventListener("click", toggleNav)
      // close the navMenu by clicking outside
      menuOverlay.addEventListener("click", toggleNav)

      function toggleNav() {
        navMenu.classList.toggle("open")
        menuOverlay.classList.toggle("active")
        document.body.classList.toggle("hidden-scrolling")
      }

      navMenu.addEventListener("click", event => {
        if (
          event.target.hasAttribute("data-toggle") &&
          window.innerWidth <= mediaSize
        ) {
          // prevent default anchor click behavior
          event.preventDefault()
          const menuItemHasChildren = event.target.parentElement
          // if menuItemHasChildren is already expanded, collapse it
          if (menuItemHasChildren.classList.contains("active")) {
            collapseSubMenu()
          } else {
            // collapse existing expanded menuItemHasChildren
            if (navMenu.querySelector(".menu-item-has-children.active")) {
              collapseSubMenu()
            }
            // expand new menuItemHasChildren
            menuItemHasChildren.classList.add("active")
            const subMenu = menuItemHasChildren.querySelector(".sub-menu")
            subMenu.style.maxHeight = subMenu.scrollHeight + "px"
          }
        }
      })
      function collapseSubMenu() {
        navMenu
          .querySelector(".menu-item-has-children.active .sub-menu")
          .removeAttribute("style")
        navMenu
          .querySelector(".menu-item-has-children.active")
          .classList.remove("active")
      }
      function resizeFix() {
        // if navMenu is open ,close it
        if (navMenu.classList.contains("open")) {
          toggleNav()
        }
        // if menuItemHasChildren is expanded , collapse it
        if (navMenu.querySelector(".menu-item-has-children.active")) {
          collapseSubMenu()
        }
      }

      window.addEventListener("resize", function() {
        if (this.innerWidth > mediaSize) {
          resizeFix()
        }
      })
    })()
  }, [])

  return (
    <header className="header-custom position-sticky">
      <div className="">
        <div className="header-main shadow">
          <Link to="/" className="logo ">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="open-nav-menu">
            <span></span>
          </div>
          <div className="menu-overlay"></div>

          <nav className="nav-menu">
            <div className="close-nav-menu">
              <img src={closeIcon} alt="close" />
            </div>
            <ul className="menu">
              <li className="menu-item">
                <Link
                  to="/about"
                  style={
                    window && window?.location?.href?.indexOf("/about") !== -1
                      ? { color: "#be2c95" }
                      : {}
                  }
                >
                  About
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  to="/posts"
                  style={
                    window && window?.location?.href?.indexOf("/posts") !== -1
                      ? { color: "#be2c95" }
                      : {}
                  }
                >
                  Posts
                </Link>
              </li>
              <li className="menu-item menu-item-has-children">
                <a
                  href="#"
                  data-toggle="sub-menu"
                  style={
                    window &&
                    window?.location?.href?.indexOf("/category") !== -1
                      ? { color: "#be2c95" }
                      : {}
                  }
                >
                  Categories <i className="plus"></i>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to={`/category/${slugify("Faith")}`}
                      style={
                        window &&
                        window?.location?.href?.indexOf(
                          `/category/${slugify("Faith")}`
                        ) !== -1
                          ? { color: "#be2c95" }
                          : {}
                      }
                    >
                      Faith
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      to={`/category/${slugify("Love & Relationships")}`}
                      style={
                        window &&
                        window?.location?.href?.indexOf(
                          `/category/${slugify("Love & Relationships")}`
                        ) !== -1
                          ? { color: "#be2c95" }
                          : {}
                      }
                    >
                      Love & Relationships
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      to={`/category/${slugify("Money/Business Matters")}`}
                      style={
                        window &&
                        window?.location?.href?.indexOf(
                          `/category/${slugify("Money/Business Matters")}`
                        ) !== -1
                          ? { color: "#be2c95" }
                          : {}
                      }
                    >
                      Money/Business Matters
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      to={`/category/${slugify("Fashion")}`}
                      style={
                        window &&
                        window?.location?.href?.indexOf(
                          `/category/${slugify("Fashion")}`
                        ) !== -1
                          ? { color: "#be2c95" }
                          : {}
                      }
                    >
                      Fashion
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      to={`/category/${slugify("Random Thoughts")}`}
                      style={
                        window &&
                        window?.location?.href?.indexOf(
                          `/category/${slugify("Random Thoughts")}`
                        ) !== -1
                          ? { color: "#be2c95" }
                          : {}
                      }
                    >
                      Random Thoughts
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      to={`/category/${slugify("Our Guests")}`}
                      style={
                        window &&
                        window?.location?.href?.indexOf(
                          `/category/${slugify("Our Guests")}`
                        ) !== -1
                          ? { color: "#be2c95" }
                          : {}
                      }
                    >
                      Our Guests
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      to={`/category/${slugify("Birthday Notes")}`}
                      style={
                        window &&
                        window?.location?.href?.indexOf(
                          `/category/${slugify("Birthday Notes")}`
                        ) !== -1
                          ? { color: "#be2c95" }
                          : {}
                      }
                    >
                      Birthday Notes
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="menu-item">
                <Link
                  to="/contact"
                  style={
                    window && window?.location?.href?.indexOf(`/contact`) !== -1
                      ? { color: "#be2c95" }
                      : {}
                  }
                >
                  {" "}
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NewHeader
