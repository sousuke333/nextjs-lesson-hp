import Link from "next/link";
import { Layout } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

//getStaticPropsから受け取ったデータでページを作成
export default function Post({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID :"}
        {post.id}
      </p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            ></path>
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  //idを取得してpathsに
  const paths = await getAllPostIds();
  //getStaticPathsに必要な記述
  return {
    paths,
    //fallback:リクエスト元のデータ更新に対応するかどうか
    //falseなら新規(ここでは101番目)の投稿が増えても404を返すtrueなら更新対応(再build?)
    fallback: false,
  };
}

//ここでreturnされたポストデータは上記のPostで使用
export async function getStaticProps({ params }) {
  //getPostDataで個別のデータを取得しpostへ格納、returnする
  const { post: post } = await getPostData(params.id);
  return {
    props: {
      post,
    },
  };
}
