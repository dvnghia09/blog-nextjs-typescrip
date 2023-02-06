import { NextPage } from "next"
import { useMemo, useState } from "react";
import { GetServerSideProps } from 'next'
import {getBlogs} from '../../server/blogs'
import { BlogPost } from 'types/blog';
import { InferGetServerSidePropsType } from 'next';
import BlogPreview from '@/components/BlogPreview';
import Link from 'next/link'


const Home: NextPage = ({blogs, tags}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const filterLabel = (tag:any, idx:number) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((id) => id !== idx))
      setFilterWord(filterWord.filter((text) => text !== tag.innerText))
    } else {
      setSelected([...selected, idx])
      setFilterWord([...filterWord, tag.innerText])
    }
  }

  const filterBlogs: BlogPost[] = useMemo(() => {
    if (filterWord.length == 0) {
      return blogs;
    } else {
      return blogs.filter((blog: BlogPost) => {
        return filterWord.every((filter) => blog.tags.includes(filter))
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterWord])

  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-100 font-narrow">
      <title>Home Page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]"> Welcom to nghiadv </h1>
          <p>A full-stack blog made with Next.js, TailwindCSS, Github GraphQL</p>
        </div>
      </section>
      <section className='flex flex-col items-center text-[1.15rem] mt-12'>
        <div className='flex gap-3 mb-12'>
          {tags.map((tag: string, index: number) => {
            return (
              <button onClick={(event) =>  filterLabel(event.target, index)} key={index} className={` px-2 rounded-xl  ${selected.includes(index) ? 'bg-sky-400' : 'bg-sky-600 text-zinc-800' }`}>
                {tag}
              </button>
            )
          })}
        </div>
          {filterBlogs.map((blog: BlogPost) => {
            return (
              <div key={blog.id} className='text-neutral-900 w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinec-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300'>
                <Link href={{
                  pathname: "/blog-detail",
                  query: { id: blog.id },
                }}>
                  <BlogPreview
                    title={blog.title}
                    bodyText={blog.bodyText}
                    createdAt={blog.createdAt}
                    author={blog.author}
                    tags={blog.tags}
                  />
                </Link>
              </div>
            )
          }) }
        
      </section>
    </main>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async() => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }

  console.log(tags)
  return {
    props: {
      blogs,
      tags
    }
  }
}
