import React, { useEffect, useState } from 'react';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

//step 1:collect all the files from blogdata directory
//Step 2: Iterate through the and Display them

const Blog = (props) => {
  // console.log(props);
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setcount] = useState(2)
  // useEffect(() => {
  //   // console.log('Blog page rendered');
  //   fetch('http://localhost:3000/api/blogs').then((a)=>{
  //     return a.json();})
  //     .then((parsed)=>{
  //       // console.log(parsed);
  //       setBlogs(parsed);
  //     })
  // },[]);
  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`);
    setcount(count+2);
    let data = await d.json();
    setBlogs(data);
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allcount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs?.map((blogitem) => {
            return <div key={blogitem.slug} className={styles.blogItem}>
              <Link href={`/blogpost/${blogitem.slug}`}>
                <h3>{blogitem.title}</h3></Link>
              <p>{blogitem.metadesc}...</p>
              <Link href={`/blogpost/${blogitem.slug}`}><button className={styles.btn}>Read More</button></Link>
            </div>
          })}
        </InfiniteScroll>

      </main>
    </div>

  )
};
// export async function getServerSideProps(context) {
//   let res = await fetch('http://localhost:3000/api/blogs');
//   let allBlogs = await res.json();
//   return {
//     props: {
//       allBlogs
//     }
//   };
// }
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allcount = data.length;
  let myfile;
  let allBlogs = [];
  for (let i = 0; i < 2; i++) {
    const element = data[i];
    myfile = await fs.promises.readFile(`blogdata/${element}`, 'utf-8');
    allBlogs.push(JSON.parse(myfile));
  }
  return {
    props: {
      allBlogs,allcount
    }
  };
}

export default Blog