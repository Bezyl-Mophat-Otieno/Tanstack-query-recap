import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";

const POSTS = [
  {
    id: 1,
    title: "Post 1",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Sed euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
  },
  {
    id: 2,
    title: "Post 2",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Sed euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
  },
  {
    id: 3,
    title: "Post 3",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Sed euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
  },
];

const wait = async (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });
};

// Testing out the enabled property in use query hook

const fetchPostIds = async () => {
  await wait(1000);
  return POSTS.find((post) => post.id);
};

const fetchPostTitle = async (id) => {
  await wait(1000);
  return POSTS.find((post) => post.id === id).title;
};

function App1() {
  const postId = 1;

  const postIdQuery = useQuery({
    queryKey: ["postIds", postId],
    queryFn: ({ queryKey }) => fetchPostIds(queryKey[1]),
  });

  const postTitleQuery = useQuery({
    queryKey: ["postTitle", postId],
    enabled: postIdQuery.data?.id !== null,
    queryFn: () => fetchPostTitle(postId),
  });

  if (postIdQuery.status === "loading") {
    return <h1>Loading .....</h1>;
  }
  if (postIdQuery.status === "error") {
    return <h1>Error</h1>;
  }

  console.log(postIdQuery.data);
  console.log(postTitleQuery.data);

  return (
    <>
      <h1>Post Ids</h1>
      {
        <>
          <div>{postIdQuery.data.id}</div>
          <h1>Post Title</h1>
          <div>{postTitleQuery.data}</div>
        </>
      }
    </>
  );
}

export default App1;
