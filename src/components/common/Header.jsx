import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const handleOnLogoutClick = () => {
    const logoutConfirm = window.confirm("정말 로그아웃 하시겠습니까?");
    if (logoutConfirm) {
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  };
  return (
    <StickyContainer>
      <FlexHeader>
        <span>My Todo List</span>
        <LogoutButton
          onClick={() => {
            handleOnLogoutClick();
          }}
        >
          {user ? "Logout" : "React"}
        </LogoutButton>
      </FlexHeader>
    </StickyContainer>
  );
};

const StickyContainer = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
`;

const FlexHeader = styled.div`
  margin: 0.6rem 0;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  background-color: #f7cac9;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: #2e050a;
`;

const LogoutButton = styled.button`
  background-color: #f7cac9;
  border: none;
  font-size: 1.5rem;
  ${(props) => (props.children === "Logout" ? "cursor:pointer" : null)}
`;

export default Header;
