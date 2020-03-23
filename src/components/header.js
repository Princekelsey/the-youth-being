import React, { useState } from "react"
import PropTypes from "prop-types"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap"
import { slugify } from "../utils/slugifyFormatter"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar fixed="top" light expand="sm">
        <div className="container">
          <NavbarBrand href="/" className="text-light">
            {siteTitle}
            {/* <img src="img/logo.jpeg" style={{ width: "5%" }} /> */}
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/about" className="text-light">
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/team" className="text-light">
                  Team
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Spirit Flakes")}`}>
                      Spirit Flakes
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Random Thoughts")}`}>
                      Random Thoughts
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Fashion Talks")}`}>
                      Fashion Talks
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Love & Relationship")}`}>
                      Love & Relationship
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Our TYB Guests")}`}>
                      Our TYB Guests
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Birthday Posts")}`}>
                      Birthday Posts
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {/* <NavbarText>Simple Text</NavbarText> */}
          </Collapse>
        </div>
      </Navbar>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
