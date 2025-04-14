import { styled } from "styled-components";
 import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { useState } from "react"; 


 const Wrapper = styled.div`
   display: grid;
   grid-template-columns: 3fr 1fr;
   padding: 20px;
   border: 1px solid rgba(255, 255, 255, 0.5);
   border-radius: 15px;
 `;
 
 const Column = styled.div`
  &:last-child {
     place-self: end;
   }
 `;
 
 const Photo = styled.img`
   width: 100px;
   height: 100px;
   border-radius: 15px;
 `;
 
 const Username = styled.span`
   font-weight: 600;
   font-size: 15px;
 `;
 
 const Payload = styled.p`
   margin: 10px 0px;
   font-size: 18px;
 `;

 const DeleteButton = styled.button`
  
   background-color: tomato;
   color: white;
   font-weight: 600;
   border: 0;
   font-size: 12px;
   padding: 5px 10px;
   text-transform: uppercase;
   border-radius: 5px;
   cursor: pointer;
 `;

 const EditButton = styled.button`
  background-color: #1DA1F2;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; // Delete 버튼과 간격
`;
 
 
 export default function Tweet({ username, photo, tweet, userId, id}: ITweet) {
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(tweet);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delte this tweet?")
    if (!ok || user?.uid !== userId) return ;
    try{
      await deleteDoc(doc(db, "tweets", id));
      if(photo){
        const photoRef = ref(storage,`tweets/${user.uid}/${id}`)
        await deleteObject(photoRef);
      }
    }catch(e){
      console.log(e);
    }finally{

    }
  };

  const onEditSave = async () => {
    if (editText.trim() === "") return alert("내용을 입력해주세요.");
    setLoading(true);

    const tweetRef = doc(db, "tweets", id);
    let newPhotoURL = photo;

    try {
      if (newFile) {
        if (photo) {
          try {
            const oldRef = ref(storage, `tweets/${user?.uid}/${id}`);
            await deleteObject(oldRef);
          } catch (error) {
            console.warn("기존 이미지 삭제 실패 (없을 수 있음):", error);
          }
        }
        const storageRef = ref(storage, `tweets/${user?.uid}/${id}`);
        const result = await uploadBytes(storageRef, newFile);
        console.log("이미지 업로드 완료:", result);
        newPhotoURL = await getDownloadURL(result.ref);
        console.log("다운로드 URL:", newPhotoURL);
      }

      await updateDoc(tweetRef, {
        tweet: editText,
        photo: newPhotoURL || null,
      });

      setIsEditing(false);
      setNewFile(null);
    } catch (e) {
      console.log("업데이트 실패:", e);
    }finally{
      setLoading(false);
    }
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditText(tweet);   
    setNewFile(null);   
  };


  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ fontSize: "16px", padding: "5px", width: "100%" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setNewFile(file);
              }}
              style={{ marginTop: "10px" }}
            />
            <div style={{ marginTop: "10px" }}>
              <EditButton onClick={onEditSave}  style={{ marginLeft: "0px", marginRight:"10px" }}>Save</EditButton>
              <DeleteButton onClick={onCancelEdit}>Cancel</DeleteButton>
            </div>
          </>
        ) : (
          <>
            <Payload>{tweet}</Payload>
            {user?.uid === userId ? (
              <>
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
              </>
            ) : null}
          </>
        )}
      </Column>

      <Column>
        {(photo || newFile) && (
          <Photo src={newFile ? URL.createObjectURL(newFile) : photo} />
        )}
      </Column>
    </Wrapper>
  );
}