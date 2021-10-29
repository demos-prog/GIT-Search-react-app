import React, { useState, Suspense } from "react";
import styled from "styled-components";
import Header from "./components/header";
import spinner from "./components/images/Spin-1s-200px.svg";
import "./App.css";

const Repos = React.lazy(() => import("./components/repos"));

function App() {
  let [user, setUser] = useState(null);
  let [status, setStatus] = useState(false);

  return (
    <>
      <Header setUser={setUser} setStatus={setStatus} />

      {status ? (
        <StartBody>
          <div>
            <img src={"/user-not-found.png"} alt="user-not-found"></img>
          </div>
        </StartBody>
      ) : null}

      {user === null ? (
        <StartBody>
          <div>
            <img src={"/start-img.png"} alt="start-img"></img>
          </div>
        </StartBody>
      ) : (
        <Body>
          <LeftSide>
            <Avatar>
              <AvatarImg src={user.avatar_url} alt="avatar"></AvatarImg>
            </Avatar>
            <UserName>{user.name}</UserName>
            <Link target="_blank" href={user.html_url}>
              {user.login}
            </Link>
            <Followers>
              <FollItem>
                <FollItemImg>
                  <AvatarImg src={"/followers.png"} alt="followers"></AvatarImg>
                </FollItemImg>
                <FollIteminfo>
                  <FollItemNumber>
                    {user.followers > 1000
                      ? (user.followers / 1000).toFixed(1) + "K"
                      : user.followers}
                  </FollItemNumber>
                  <FollItemText>followers</FollItemText>
                </FollIteminfo>
              </FollItem>
              <FollItem>
                <FollItemImg>
                  <AvatarImg
                    style={{ height: 24 }}
                    src={"/follower.png"}
                    alt="follower"
                  ></AvatarImg>
                </FollItemImg>
                <FollIteminfo>
                  <FollItemNumber>
                    {user.following > 1000
                      ? (user.following / 1000).toFixed(1) + "K"
                      : user.following}
                  </FollItemNumber>
                  <FollItemText>following</FollItemText>
                </FollIteminfo>
              </FollItem>
            </Followers>
          </LeftSide>

          <RightSide>
            <NumberOfRepos>Repositories ({user.public_repos})</NumberOfRepos>
            <Suspense
              fallback={
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={spinner} alt="Loading..."></img>
                </div>
              }
            >
              <Repos user={user}></Repos>
            </Suspense>
          </RightSide>
        </Body>
      )}
    </>
  );
}

export default App;

const Body = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const StartBody = styled.div`
  height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSide = styled.div`
  flex: 1 1 65%;
`;

const NumberOfRepos = styled.div`
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 29px;
`;

const LeftSide = styled.div`
  flex: 0 0 33%;
  margin-right: 15px;
`;

const Avatar = styled.div`
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 29px;
  width: 280px;
  height: 280px;
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
`;

const UserName = styled.div`
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 12px;
`;

const Link = styled.a`
  text-decoration: none;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: #0064eb;
`;

const Followers = styled.div`
  margin-top: 25px;
  display: flex;
`;

const FollItem = styled.div`
  display: flex;
  margin-right: 20px;
`;

const FollItemImg = styled.div`
  height: 14px;
`;

const FollIteminfo = styled.div`
  display: flex;
  margin-left: 9px;
`;

const FollItemNumber = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-right: 5px;
`;

const FollItemText = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;
