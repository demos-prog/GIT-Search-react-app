import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./repos.css";

export default function Repos(props) {
  let [reposits, setReposits] = useState(null);
  let [btns, setBtns] = useState(null);
  let [firstElOfPage, setFirstElOfPage] = useState(0);
  let [totalEls, setTotalEls] = useState(0);
  let [numOfElems, setNumOfElems] = useState(4);
  let [inp, setInp] = useState("");
  let [act, setAct] = useState(0);

  useEffect(() => {
    async function getRepos() {
      return (
        await fetch(`https://api.github.com/users/${props.user.login}/repos`)
      ).json();
    }

    getRepos().then((reps) => {
      let list = reps
        .slice(firstElOfPage, firstElOfPage + numOfElems)
        .map((item) => {
          return (
            <RepItem className="repository" key={nanoid()}>
              <RepItemName target="_blank" href={item.html_url}>
                {item.name}
              </RepItemName>
              <RepItemText>{item.description}</RepItemText>
            </RepItem>
          );
        });
      setReposits(list);

      const totalElems = reps.length;
      setTotalEls(totalElems);
      const numOfPages = Math.ceil(totalElems / numOfElems);

      let buttons = [];
      for (let i = 0; i < numOfPages; i++) {
        buttons.push(i + 1);
      }

      const listOfButtons = buttons.map((item, index) => {
        return (
          <button
            className={act === index ? "active" : null}
            style={{ padding: 10, margin: 5, cursor: "pointer" }}
            key={nanoid()}
            onClick={() => {
              setFirstElOfPage(index * numOfElems);
              setAct(index);
            }}
          >
            {item}
          </button>
        );
      });

      setBtns(listOfButtons);
    });
  }, [props.user, firstElOfPage, numOfElems, act]);

  return (
    <>
      <Reposits>
        <Wrapp>{reposits}</Wrapp>
        <div>
          <FooterText>
            {firstElOfPage + 1}-{firstElOfPage + numOfElems} of{" "}
            {props.user.public_repos} items
          </FooterText>
          <div id="navBtnsWrapper">
            <button
              className="prevNextBtns"
              onClick={() => {
                setFirstElOfPage((prev) => {
                  return prev > 0 ? prev - numOfElems : null;
                });
                if (act > 0) {
                  setAct((prev) => prev - 1);
                }
              }}
            >
              Prev
            </button>
            <div id="numbersOfPageWrapper">{btns}</div>
            <button
              className="prevNextBtns"
              onClick={() => {
                setFirstElOfPage((prev) => {
                  return prev < totalEls - numOfElems
                    ? prev + numOfElems
                    : null;
                });
                if (act < Math.ceil(totalEls / numOfElems) - 1) {
                  setAct((prev) => prev + 1);
                } else {
                  setAct(0);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Reposits>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNumOfElems(inp);
          setInp("");
        }}
      >
        <Input
          type="text"
          value={inp}
          onChange={(e) => setInp(+e.target.value)}
          placeholder="Number of Items on page"
        ></Input>
      </form>
    </>
  );
}

const Reposits = styled.div``;
const Wrapp = styled.div`
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 5px 10px;
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
`;

const RepItem = styled.div`
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 24px;
`;

const RepItemName = styled.a`
  text-decoration: none;
  color: #0064eb;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 16px;
`;

const RepItemText = styled.div`
  margin-top: 16px;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
`;
