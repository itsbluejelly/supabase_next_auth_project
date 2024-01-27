"use client";

import ArticleItem from "@/components/ArticleItem";
import { useArticles } from "@/hooks/useArticle";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import React from "react"

export default function Home() {
  const { articles, getArticles } = useArticles();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')

  supabase
    .channel('articles-follow-up')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'votes'
    }, async () => {
      await getArticles()
    })
    .subscribe();

  useEffect(() => {
    setIsLoading(true);
    setError("");

    try {
      getArticles();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [getArticles]);

  return (
    <div className="container mx-auto my-8">
      {
        !isLoading 
          ? 
        <div className="grid gap-4">
          {articles.map((article: any, key: number) => {
            return <ArticleItem key={key} article={article} />;
          })}
        </div>
          :
        <p>Loading...</p>
      }

      {error && <p>{error}</p>}
    </div>
  );
}
