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
              {/* <NavItem>
                <NavLink href="/team" className="text-light">
                  Team
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink href="/posts" className="text-light">
                  Posts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contact" className="text-light">
                  Contact Me
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Faith")}`}>Faith</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Love & Relationships")}`}>
                      Love & Relationships
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Money/Business Matters")}`}>
                      Money/Business Matters
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Fashion")}`}>Fashion</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Random Thoughts")}`}>
                      Random Thoughts
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Our Guests")}`}>
                      Our Guests
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={`/category/${slugify("Birthday Notes")}`}>
                      Birthday Notes
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
