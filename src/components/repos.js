import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Repos(props) {
  let [reposits, setReposits] = useState(null);
  let [btns, setBtns] = useState(null);
  let [firstElOfPage, setFirstElOfPage] = useState(0);
  let [totalEls, setTotalEls] = useState(0);
  const numOfElems = 4;

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
            <RepItem key={nanoid()}>
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
            style={{ padding: 10, cursor: "pointer" }}
            key={nanoid()}
            onClick={() => {
              setFirstElOfPage(index * numOfElems);
            }}
          >
            {item}
          </button>
        );
      });

      setBtns(listOfButtons);
    });
  }, [props.user, firstElOfPage]);

  return (
    <Reposits>
      <Wrapp>{reposits}</Wrapp>
      <FooterBtns>
        <FooterText>
          {firstElOfPage + 1}-{firstElOfPage + 4} of {props.user.public_repos}{" "}
          items
        </FooterText>
        <ButtonPrev
          onClick={() => {
            setFirstElOfPage((prev) => {
              return prev > 0 ? prev - numOfElems : null;
            });
          }}
        >
          Prev
        </ButtonPrev>
        {btns}
        <ButtonNext
          onClick={() => {
            setFirstElOfPage((prev) => {
              return prev < totalEls - numOfElems ? prev + numOfElems : null;
            });
          }}
        >
          Next
        </ButtonNext>
      </FooterBtns>
    </Reposits>
  );
}

const Reposits = styled.div``;
const Wrapp = styled.div`
  ${'' /* min-height: 520px; */}
  margin-bottom: 40px;
`;

const FooterBtns = styled.div`
  display: flex;
`;

const ButtonPrev = styled.button`
  margin: 0 20px;
  cursor: pointer;
`;
const ButtonNext = styled.button`
  margin: 0 20px;
  cursor: pointer;
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
  padding: 24px 32px;
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
