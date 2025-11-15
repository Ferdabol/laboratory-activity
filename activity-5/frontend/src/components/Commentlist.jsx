import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../backend/firebase";
import { DangerButton } from "./Buttons";

const CommentList = ({ comments, currentUser }) => {
  const handleDelete = async (commentId, userId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    if (!currentUser || currentUser.uid !== userId) return;

    try {
      await deleteDoc(doc(db, "post", comments[0]?.postId, "comments", commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (!comments.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center text-[#2D2424]">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      {comments.map((c) => (
        <div key={c.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-start">
          <div>
            <p className="font-semibold text-[#2D2424]">{c.userName || "Anonymous"}</p>
            <p className="text-[#2D2424] mt-1 whitespace-pre-wrap">{c.content}</p>
          </div>
          {currentUser?.uid === c.userId && (
            <DangerButton onClick={() => handleDelete(c.id, c.userId)}>
              Delete
            </DangerButton>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
