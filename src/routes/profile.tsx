import styled from "styled-components";
import { auth, db, storage } from "../firebase"
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
    display: flex;
    align-items: center; //교차축(main 축과 수직인 축)을 기준으로 자식 요소들을 어떻게 정렬할지
    flex-direction: column; // 자식 요소들이 어떤 방향으로 정렬될지를 정하는 속성
    gap:20px;
`;
const AvatarUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
     border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
    width: 50px;
    }

`;
const AvatarImg = styled.img`
    width: 100%;
`;
const AvatarInput = styled.input`
    display: none;
`;
const Name = styled.span`
    font-size: 22px;
`;

const Tweets = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: white; // 흰색 아이콘
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: #1d9bf0;
  }
`;


const NameInput = styled.input`
  font-size: 22px;
  padding: 6px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  width: 240px; // 너비 고정
  outline: none;

  &:focus {
    border-color: #1d9bf0;
    box-shadow: 0 0 4px rgba(29, 155, 240, 0.5);
  }
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL || null);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const saveNewName = async () => {
    if (!user || newName.trim() === "") return;
    await updateProfile(user, { displayName: newName.trim() });
    setIsEditingName(false);
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    })
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return <Wrapper>
    <AvatarUpload htmlFor="avatar">
      {avatar ? (<AvatarImg src={avatar} />) : (<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
      </svg>)}
    </AvatarUpload>
    <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
    <NameWrapper>
      {isEditingName ? (
        <>
          <NameInput value={newName} onChange={onNameChange} onBlur={saveNewName} autoFocus />
        </>
      ) : (
        <>
          <Name>{user?.displayName ?? "Anonymous"}</Name>
          <EditButton onClick={() => setIsEditingName(true)} title="Edit nickname">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17.414 2.586a2 2 0 0 0-2.828 0L7.172 10l-.707 2.828A1 1 0 0 0 7.172 14l2.828-.707 7.414-7.414a2 2 0 0 0 0-2.828l-.586-.586ZM6.121 11.121l1.414-1.414 2.828 2.828-1.414 1.414L6.121 11.12Z" />
            </svg>
          </EditButton>

        </>
      )}
    </NameWrapper>
    <Tweets>
      {tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
    </Tweets>
  </Wrapper>
}