import React from 'react'

const Navbar = ({ user }) => {

    const isAdmin = user && user.role === 'admin'
    const isStaff = user && user.role === 'staff'

    return (
        <React.Fragment>
        </React.Fragment >
    );
}

export default Navbar;
