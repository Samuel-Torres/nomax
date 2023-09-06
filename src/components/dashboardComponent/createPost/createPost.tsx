import React from "react";
import styles from "./createPost.module.scss";

type createPostProps = {
  isCreatingPost: boolean;
  toggleForm: () => void;
};

const CreatePost = ({ isCreatingPost, toggleForm }: createPostProps) => {
  return (
    <div className={styles.container}>
      {isCreatingPost ? (
        <div>
          <form>
            <button onClick={toggleForm}>Cancel</button>
          </form>
        </div>
      ) : (
        <button onClick={toggleForm} className={styles.inputBtn}>
          Create Post
        </button>
      )}
    </div>
  );
};

export default CreatePost;
