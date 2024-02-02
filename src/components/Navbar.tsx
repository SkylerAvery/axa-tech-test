import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0.75rem 1.25rem;
  background-color: rgb(22 78 99);
  margin: 0;
`;

const NavLink = styled(Link)`
  color: rgb(243 244 246);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-decoration: none;
`

const Heading = styled.h1`
  font-weight: 800;
  font-size: 1.75rem;
  line-height: 2rem;
  text-align: center;
  padding: 0.75rem 0;
`

const Main = styled.main`
  padding-bottom: 1.25rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  display: flex;
  justify-content: flex-start;
  text-align: center;
  flex-direction: column;
`

export default function Navbar () {
  return (
    <>
      <nav>
        <NavList>
          <li>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
        </NavList>
      </nav>
      <Heading>
        Rick and Morty Character Search
      </Heading>
      <Main>
        <Outlet />
      </Main>
    </>
  )
}