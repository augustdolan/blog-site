import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Post = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: blogPost} = api.posts.get.useQuery({ id });

  return blogPost ? (
    <div>
      <h1>{blogPost.title}</h1>
      <h2>Written by: {blogPost.author.name}</h2>
      <time dateTime={blogPost.createdAt.toString()}>{blogPost.createdAt.toString()}</time>
      <p>{blogPost.content}</p>
    </div>
  ) : <p>Loading...</p>
};

export default Post;
