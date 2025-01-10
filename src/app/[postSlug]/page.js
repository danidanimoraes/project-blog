import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  console.log("post", post);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={new Date(post.frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}

export default BlogPost;
