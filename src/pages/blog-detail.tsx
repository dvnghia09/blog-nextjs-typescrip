import { NextPage } from "next"
import { GetServerSideProps } from 'next'
import {getBlogDetail} from '../../server/blogs'
import { BlogDetail } from 'types/blog';
import { InferGetServerSidePropsType } from 'next';
import BlogHeader from "@/components/BlogHeader";
import parse from 'html-react-parser';
import blog from '../styles/blog.module.css'

const BlogDetail: NextPage = ({blog}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {bodyHTML, title, author, createdAt} = blog
  return (
    <section className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-100 font-narrow">
      <div className="max-w-[50%]">
        <h1 className="text-center my-10 text-[2rem]">{ title }</h1>
        <div className="flex justify-center mb-4">
          <BlogHeader createdAt={createdAt} author={author} />
        </div>
        <div className={`${blog.html} flex flex-col`}>
          {parse(bodyHTML)}
        </div>
      </div>
    </section>
  )
}

export default BlogDetail

export const getServerSideProps: GetServerSideProps = async(context) => {
  const router: number = Number(context.query.id)
  let blog: BlogDetail = await getBlogDetail(router)
  console.log(blog)
  return {
    props: {
      blog
    }
  }
}
