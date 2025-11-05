import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ setAuth, username }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewNote, setViewNote] = useState(null);

  // Fetch notes from backend
  useEffect(() => {
    if (!username) return;
    fetchNotes();
  }, [username]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/notes", {
        params: { username },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuth(false);
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    try {
      const res = await axios.post("http://localhost:3000/notes", {
        title: title.trim() || "Untitled",
        content: content.trim(),
        username,
      });
      setNotes((s) => [res.data, ...s]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/notes/${id}`, {
        title: editTitle,
        content: editContent,
        username,
      });
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
      cancelEdit();
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };


  const openView = (note) => setViewNote(note);
  const closeView = () => setViewNote(null);

  // Close on ESC and lock body scroll when modal open
  useEffect(() => {
    if (!viewNote) return;
    const onKey = (e) => e.key === "Escape" && closeView();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [viewNote]);

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await axios.delete(`http://localhost:3000/notes/${id}`, {
        params: { username },
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl shadow-lg bg-[var(--color-card)]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3 text-[var(--color-dark)]">
            <span className="text-3xl sm:text-4xl">🗒️</span>
            Your Notes
          </h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 bg-[var(--color-dark)] text-[var(--color-text-light)]"
          >
            Logout
          </button>
        </header>

        {/* Add Note Form */}
        <section className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl shadow-lg bg-[var(--color-card)]">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[var(--color-dark)]">
            {`Hello, ${username || "User"} — Create a New Note`}
          </h2>
          <form onSubmit={addNote} className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white border-2 border-[var(--color-muted)] text-[var(--color-text)] focus:border-[var(--color-primary)]"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none bg-white border-2 border-[var(--color-muted)] text-[var(--color-text)] focus:border-[var(--color-primary)]"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md bg-transparent border-2 border-[var(--color-accent)] text-[var(--color-text)]"
              >
                Clear
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 bg-[var(--color-primary)] text-[var(--color-text-light)]"
              >
                Add Note
              </button>
            </div>
          </form>
        </section>

        {/* Notes Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)]">
              All Notes ({notes.length})
            </h2>
          </div>

          {loading && (
            <div className="text-center py-10 sm:py-12 rounded-2xl bg-[var(--color-card)]">
              <div className="text-base sm:text-lg text-[var(--color-text)]">
                Loading notes...
              </div>
            </div>
          )}

          {!loading && notes.length === 0 && (
            <div className="text-center py-12 sm:py-16 rounded-2xl shadow-lg bg-[var(--color-card)]">
              <span className="text-5xl sm:text-6xl mb-4 block">📝</span>
              <p className="text-base sm:text-lg text-[var(--color-text)]">
                No notes yet — create your first note above!
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {notes.map((note) => {
              const isLong =
                (note.title?.length || 0) > 60 ||
                (note.content?.length || 0) > 200;
              return (
              <div
                key={note._id}
                className="h-full p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                style={{
                  backgroundColor:
                    editingId === note._id ? "rgba(155,180,192,0.2)" : "var(--color-card)",
                  borderColor:
                    editingId === note._id ? "var(--color-primary)" : "var(--color-muted)",
                  minHeight: "200px",
                }}
              >
                {editingId === note._id ? (
                  <div className="flex-1 flex flex-col">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 border-2 border-[var(--color-muted)] text-[var(--color-text)] bg-white"
                      placeholder="Title"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg mb-3 flex-1 resize-none focus:outline-none focus:ring-2 border-2 border-[var(--color-muted)] text-[var(--color-text)] bg-white"
                      placeholder="Content"
                    />
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                      <button
                        onClick={() => saveEdit(note._id)}
                        className="w-full sm:w-auto px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md bg-[var(--color-primary)] text-[var(--color-text-light)]"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="w-full sm:w-auto px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-md bg-transparent border-2 border-[var(--color-accent)] text-[var(--color-text)]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <h3
                      className="text-base sm:text-lg font-bold mb-2 break-words line-clamp-2 text-[var(--color-dark)]"
                      title={note.title}
                    >
                      {note.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 flex-1 break-words text-[var(--color-text)] ${isLong ? "line-clamp-4 cursor-pointer" : ""}`}
                      title={note.content}
                      onClick={() => isLong && openView(note)}
                    >
                      {note.content || <em className="text-[var(--color-muted)]">No content</em>}
                    </p>

                    <div className="mt-auto">
                      <div className="text-xs mb-3 text-[var(--color-muted)]">
                        {new Date(note.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {isLong && (
                          <button
                            onClick={() => openView(note)}
                            className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md bg-[var(--color-dark)] text-[var(--color-text-light)]"
                          >
                            View
                          </button>
                        )}
                        <button
                          onClick={() => startEdit(note)}
                          className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md bg-[var(--color-primary)] text-[var(--color-text-light)]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note._id)}
                          className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md bg-[var(--color-accent)] text-[var(--color-text-light)]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )})}
          </div>
        </section>
      </div>

      {/* Modal */}
      {viewNote && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="note-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3 sm:px-6"
          onClick={(e) => e.target === e.currentTarget && closeView()}
        >
          <div className="w-full max-w-2xl max-h-[85vh] overflow-auto rounded-2xl shadow-2xl bg-[var(--color-card)] border-2 border-[var(--color-muted)]">
            <div className="p-4 sm:p-6 border-b border-[var(--color-muted)] flex items-start justify-between gap-4">
              <h3 id="note-title" className="text-lg sm:text-xl font-bold text-[var(--color-dark)] break-words">
                {viewNote.title}
              </h3>
              <button
                onClick={closeView}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-transparent border-2 border-[var(--color-accent)] text-[var(--color-text)] hover:shadow-md"
              >
                Close
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-xs mb-3 text-[var(--color-muted)]">
                {new Date(viewNote.createdAt).toLocaleString()}
              </div>
              <div className="whitespace-pre-wrap break-words text-[var(--color-text)] leading-relaxed">
                {viewNote.content || <em className="text-[var(--color-muted)]">No content</em>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
