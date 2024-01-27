'use client';

import IconsUp from '@/components/icons/up';
import { useArticles } from '@/hooks/useArticle';
import { useSupabase } from '@/hooks/useSupabase';
import { useEffect, useState } from 'react';

export type Article = {
  id: number;
  created_at?: string;
  title: string;
  votes?: any[];
}

export default function ArticleItem({
  article: {
    id,
    title,
    votes
  }
}: {
  article: Article
}) {
  const { user, getCurrentUser } = useSupabase();
  const { newVote } = useArticles()

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    setError('')

    try{
        getCurrentUser();
    }catch(error){
        setError((error as Error).message)
    }finally{
        setIsLoading(false)
    }

  }, [getCurrentUser])

  useEffect(() => {
    setIsLoading(true)

    try{
       if (user) {
            const { id } = user;
            const findVote = votes?.find(v => v.user_id === id);
            
            if (findVote){ 
                setHasVoted(true)
                setError(`Yor vote is already casted for ${findVote}`)
            }
        }
    }catch(error){
        setError((error as Error).message)
    }finally{
        setIsLoading(false)
    }
  }, [user, votes])

  return (
    <div>
      {!isLoading && <div className="border flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-900">
        <h2>{title}</h2>
        <div className={`grid ${hasVoted ? "text-rose-700" : "text-white"}`}>
          <span
            onClick={() => {
              setIsLoading(true);
              newVote(id);
              setIsLoading(false);
            }}
          >
            <IconsUp />
          </span>

          <span>{votes?.length} votes</span>

          <span
            onClick={() => {
              setIsLoading(true);
              newVote(id, true);
              setIsLoading(false);
            }}
          >
            <IconsUp className="rotate-180" />
          </span>
        </div>
      </div>}
    </div>
  );
}