import React, {useState} from 'react';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';
import {Link} from 'react-router-dom';

const DashboardMenu = ({logout}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color='light' light expand='md'>
            <NavbarBrand href="/" className="mr-auto">Home</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className='ml-auto' navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            More Actions
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavLink tag={Link} to={'/client/add'}>
                                    Add Client
                                </NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink tag={Link} to={'/profile'}>
                                    View Profile
                                </NavLink>
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem onClick={logout}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    )
};

export default DashboardMenu;
