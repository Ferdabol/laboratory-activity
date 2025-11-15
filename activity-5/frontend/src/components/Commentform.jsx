import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../backend/firebase";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    const userId = localStorage.getItem("userId"); // get from localStorage
    if (!userId) {
      setError("You must be logged in to comment.");
      return;
    }

    const userName = localStorage.getItem("username") || "Anonymous"; // optional, store name if you want

    setLoading(true);
    setError("");

    try {
      const commentsRef = collection(db, "post", postId, "comments");

      const newComment = {
        content: comment,
        userId: userId, // from localStorage
        userName: userName,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(commentsRef, newComment);
      setComment("");

      if (onCommentAdded) onCommentAdded({ id: docRef.id, ...newComment });
    } catch (err) {
      console.error(err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setComment("");
    setError("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-[#5C3D2E] mb-4 font-['Merriweather']">
        Leave a Comment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg 
                     focus:outline-none focus:border-[#B85C38] focus:ring-2 
                     focus:ring-[#B85C38]/20 transition-colors 
                     resize-none text-[#2D2424]"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <PrimaryButton type="submit" disabled={loading || !comment.trim()}>
            {loading ? "Posting..." : "Post Comment"}
          </PrimaryButton>

          {comment && (
            <SecondaryButton
              type="button"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </SecondaryButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
