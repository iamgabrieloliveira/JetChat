import styled from "styled-components";

export const Container = styled.div`
  background: #301134;
  height: 13px;
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #230505;
  align-items: center;
  border-radius: 20px 20px 0px 0px;
  position: fixed;
`
export const Title = styled.h1`
    color: white;
    font-size: 16px;
`
export const SearchInput = styled.input`
  background: white;
  width: 200px;
  margin-top: 10px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  transition: .6s;
  padding-left: 8px;
  &:hover {
    transform: translateY(5px);
  }
  &:focus{
    outline: 0;
    border: 0;
  }
`
export const ChangeRoomForm = styled.form`
`
export const ChangeRoomSelect = styled.select`
  padding: 8px 12px;
  border-radius: 10px 0px 0px 10px;
  background: white;
  border: 0;
  height: 34px;
  &:focus{
    outline: 0;
  }
`
export const ChangeRoomButton = styled.button`
  padding: 5px 12px;
  border-radius: 0px 10px 10px 0px;
  background: #fafaf4;
  border: 0;
  height: 34px;
  color: black;
  font-weight: normal;
  cursor: pointer;
  transition: 6s;
  &:hover{
    opacity: .7;
  }
`
export const MacIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const MacIcon = styled.div`
  width: 12px; 
  height: 12px;
  border-radius: 50%;  
  background: white;
`