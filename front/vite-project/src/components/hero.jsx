import Icon from '../../public/plus-round-line-icon.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        
      },
    },
    // More posts...
  ]
  
  
  export default function Blegs() {

    const config = { headers: { Authorization: `Bearer ${token}`}};
    const API_URL = 'http://localhost:3000/api/blogs/allblogs'; 
    const [blogPosts, setBlogPosts] = useState([]);
  
    useEffect(() => {
      const fetchBlogPosts = async () => {
        try {
          const response = await axios.get(API_URL);
          setBlogPosts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching blog posts:', error);
        }
      };
  
      fetchBlogPosts();
    }, []);
    return (

      <div className="bg-white place-items-start py-24 sm:py-32">
        <div>
      <h1>Blog Posts</h1>
      {blogPosts.map((data) => (
        <div key={data._id}>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>Posted by: {data.user_id}</p>
          <hr />
        </div>
      ))} 
    </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
            <a className="group block max-w-xs rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
              <div className="flex  space-x-3">
                <img src={Icon} className='w-5' />
                <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">Add Blog</h3>
              </div>
              <p className="text-slate-500 group-hover:text-white text-sm">Create a Blog for any subjact you need to discose</p>
            </a>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  