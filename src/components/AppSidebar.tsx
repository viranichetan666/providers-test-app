import styled from "styled-components";

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 400px;
  background-color: #325776;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
  color: white;
  overflow-y: auto;
  transform: translateX(525px);
  transition: 0.4s ease all;
  &.siderbar-open {
    transform: translateX(0);
  }
`;

export const SidebarItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #007a99;
  }
`;

export default SidebarContainer;
