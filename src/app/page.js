import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";

async function Home() {
  const posts = await getBlogPostList();
  console.log("sdf", posts);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {posts.map((post) => {
        return (
          <BlogSummaryCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            abstract={post.abstract}
            publishedOn={new Date(post.publishedOn)}
          />
        );
      })}
    </div>
  );
}

export default Home;
