import { Layout } from "../components/Layout";
import { Post }  from "../components/Post";
import { getAllPostData } from "../lib/posts";


export default function Blog ({ posts }) {
  return (
    <Layout title="Blog">
    {/* <p className='text-4xl'>
      Blog Page!
    </p> */}
    <ul className="m-10">
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </ul>
    </Layout>
  )
}

// export default Blog;

//サーバーサイドでbuild時に実行されるNEXT.jsの関数
export async function getStaticProps(){
  //この中はbuild時一回だけ実行される
  const posts = await getAllPostData();
  return {
    props: {posts},
  };
}