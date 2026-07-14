import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserById } from "../services/userService";

type Props = {
  userId: string;
  onClose: () => void;
};

type User = {
  username: string;
  avatar: string;
  bio: string;
};

function ProfileModal({ userId, onClose }: Props) {
  const [user, setUser] = useState<User>({
    username: "",
    avatar: "",
    bio: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, [userId]);

  const newLocal =
    "relative w-full max-w-lg rounded-3xl bg-(--bg-light) border border-(--border) p-8 shadow-2xl";
  return (
    // <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className={newLocal}
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        transition={{
          duration: 0.2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}

        <button
          className="absolute top-5 right-5 text-xl cursor-pointer text-(--text-muted) hover:text-(--text)"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Avatar */}

        <img
          src={user.avatar}
          alt={user.username}
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />

        {/* Username */}

        <h1 className="mt-5 text-3xl font-bold text-center text-(--text)">
          @{user.username}
        </h1>

        {/* Bio */}

        <p className="mt-3 text-center text-(--text-muted)">
          {user.bio || "No bio yet."}
        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3">
          <button className="rounded-xl bg-(--primary) py-3 font-semibold text-(--bg-dark)">
            Message
          </button>

          <button className="rounded-xl border border-(--border) py-3 text-(--text)">
            Add Friend
          </button>

          <button className="rounded-xl border border-(--border) py-3 text-(--text)">
            Invite to Group
          </button>
        </div>
      </motion.div>
    </motion.div>
    // </AnimatePresence>
  );
}

export default ProfileModal;
