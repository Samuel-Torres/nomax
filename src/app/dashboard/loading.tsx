import createPostStyles from "../../components/dashboardComponent/createPost/createPost.module.scss";
import postCardStyles from "../../components/dashboardComponent/postCards/postCard.module.scss";
import LoadingText from "@/components/loadingStateComponents/loadingText";
export default function Loading() {
  return (
    <div>
      <form className={createPostStyles.container}>
        <div className={createPostStyles.inputBtnContainer}>
          <button className={createPostStyles.inputBtn}>Create Post</button>
        </div>
      </form>

      <div className={postCardStyles.container} style={{ margin: "15px auto" }}>
        <div className={postCardStyles.loadingContainer}>
          <LoadingText />
        </div>
      </div>
    </div>
  );
}
