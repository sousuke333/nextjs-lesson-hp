// サーバーサイドで実行されるAPIにfetchするための関数
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

//fetchはapiリクエストを投げるjsの最新の書き方

//jsonPlaceholderにアクセスして取得結果を返す関数
export async function getAllPostData(){
  //リクエストして結果をresに
  const res = await fetch(new URL(apiUrl));
  //jsonデータに変更
  const posts = await res.json();
  return posts;
}

export async function getAllPostIds() {
  const res = await fetch(new URL(apiUrl));
  const posts = await res.json();

  return posts.map((post)=>{
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

export async function getPostData(id) {
  //https://jsonplaceholder.typicode.com/posts/1　などid事の情報を取得
  const res = await fetch(new URL(`${apiUrl}/${id}`));
  const post = await res.json();
  return {
    post,
  };
}