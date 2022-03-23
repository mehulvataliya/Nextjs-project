import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from "../../styles/BlogPost.module.css"
import * as fs from 'fs';

//step 1:Find the file corresponding to the slug
//step 2:Populate through the and Display them

const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog)
  // const router = useRouter();
  // useEffect(() => {
  //   if(!router.isReady) return;
  //   const { slug } = router.query;
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a) => {
  //     return a.json();
  //   })
  //     .then((parsed) => {
  //       // console.log(parsed);
  //       setBlog(parsed);
  //     })
  // }, [router.isReady]);
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          {blog && (
            <>
              <h1>{blog.title}</h1>
              <hr />
              {<div dangerouslySetInnerHTML={{ __html: blog.content }}>

              </div>}

            </>
          )}

        </main>
      </div>
    </>

  )
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'how-to-learn-flask' } },
      { params: { slug: 'how-to-learn-javascript' } },
      { params: { slug: 'how-to-learn-nextjs' } },
    ],
    fallback: true
  }
}
export async function getStaticProps(context) {
  // console.log(context);
  const { slug } = context.params
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8');
  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}

// export async function getServerSideProps(context) {
//   // console.log(context);
//   const { slug } = context.query
//   let res = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   let blog = await res.json();
//   return {
//     props: {
//       blog
//     }
//   };
// }

export default Slug;