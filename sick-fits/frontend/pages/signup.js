import Signup from "../components/Signup";
import Signin from "../components/Signin";
import styled from "styled-components";
import RequestReset from "../components/RequestReset";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = (props) => (
  <div>
    <Columns>
      <Signup></Signup>
      <Signin></Signin>
      <RequestReset></RequestReset>
    </Columns>
  </div>
);

export default SignupPage;
