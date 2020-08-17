import React from "react";
import NavStyles from "./styles/NavStyles";
import Link from "next/link";
import User from "./User";
import Signout from "./Signout";

function Nav() {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <div>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout></Signout>
            </div>
          )}
          {!me && (
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
}

export default Nav;
