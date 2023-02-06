import React from 'react'
import { BlogPost } from 'types/blog'
import BlogHeader from './BlogHeader'

const BlogPreview: React.FC<BlogPost> = (props) => {
    const {bodyText, tags, title, author, createdAt} = props
    const previewText: string = bodyText.substring(0, 150) + (bodyText.length >= 150 ? "..." : '')
  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className='font-bold'>{title}</h2>
      <p className='mt-2'>{previewText}</p>
      <div className='flex gap-3'>
        {tags.map((tag, index) => {
            return (
                <p key={index} className="bg-sky-600 px-2 rounded-xl text-zinc-800" >{tag}</p>
            )
        })}
      </div>
    </section>
  )
}

export default BlogPreview
