import createPostStyles from "../../components/dashboardComponent/createPost/createPost.module.scss";
import postCardStyles from "../../components/dashboardComponent/postCards/postCard.module.scss";
import BallSpinner from "@/components/loadingStateComponents/ballSpinner";
import LoadingText from "@/components/loadingStateComponents/loadingText";
export default function Loading() {
  const posts = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div>
      <form className={createPostStyles.container}>
        <div className={createPostStyles.inputBtnContainer}>
          <button className={createPostStyles.inputBtn}>Create Post</button>
        </div>
      </form>
      {posts.map((item, index) => {
        return (
          <div
            key={index}
            className={postCardStyles.container}
            style={{ margin: "15px auto" }}
          >
            <div className={postCardStyles.postingUserInfo}>
              <div className={postCardStyles.leftSection}>
                <BallSpinner />
                <div className={postCardStyles.secondaryLeftSection}>
                  <p className={postCardStyles.userName}></p>
                  <p className={postCardStyles.persona}></p>
                  <p className={postCardStyles.job}></p>
                </div>
              </div>
              <div className={postCardStyles.rightSection}>
                <p className={postCardStyles.timePast}></p>
              </div>
            </div>
            <div className={postCardStyles.contentContainer}>
              <div className={postCardStyles.transitionContainerWithImg}>
                <LoadingText />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
