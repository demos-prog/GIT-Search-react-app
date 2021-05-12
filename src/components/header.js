import React, { useState } from "react";
import styled from "styled-components";

export default function Header(props) {
  let [input, setInput] = useState("");

  async function getUser(name) {
    let fch = await fetch(`https://api.github.com/users/${name}`);
    props.setStatus(fch.ok);
    return fch.json();
  }

  return (
    <Wrapper>
      <img src={"/git-img.png"} alt="git-img"></img>
      <InputWrapper>
        <img src={"/search.png"} alt="search"></img>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getUser(input).then((user) => {
              props.setUser(user);
            });
            setInput("");
          }}
        >
          <Input
            type="text"
            placeholder="Enter GitHub username"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          ></Input>
        </form>
      </InputWrapper>
    </Wrapper>
  );
}

let Wrapper = styled.div`
  padding: 0 30px;
  height: 72px;
  background-color: #0064eb;
  display: flex;
  align-items: center;
`;

let InputWrapper = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 500px;
  border-radius: 5px;
  margin-left: 22px;
  padding: 8px 14px;
`;

let Input = styled.input`
  width: 100%;
  border: none;
  outline: none !important;
  padding-left: 10px;
`;
