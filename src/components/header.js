import React, { useState } from "react";
import styled from "styled-components";
import "./header.css"

export default function Header(props) {
  let [input, setInput] = useState("");

  async function getUser(name) {
    let res = await fetch(`https://api.github.com/users/${name}`);
    props.setStatus(!res.ok);
    return await res.json();
  }

  return (
    <Wrapper>
      <img src={"/git-img.png"} alt="git-img"></img>
      <InputWrapper>
        <img src={"/search.png"} alt="search"></img>
        <form id="fr"
          onSubmit={(e) => {
            e.preventDefault();
            getUser(input).then((user) => {
              props.setUser(user);
            });
            setInput("");
          }}
        >
          <input
            type="text"
            placeholder="Enter GitHub username"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          ></input>
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
