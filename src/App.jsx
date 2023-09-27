import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";

export const POSTS = [
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

const wait = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...POSTS]);
      reject(new Error("Something went wrong"));
    }, duration);
  });
};
wait(1000)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

const fetchPosts = async () => {
  await wait(1000);
  return POSTS;
};

export const createPosts = async (title, body) => {
  const id = v4();
  await wait(1000);
  POSTS.push({ id, title, body });
  console.log(POSTS);
  return POSTS;
};

function App() {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const postsMutation = useMutation({
    mutationFn: (title, body) => createPosts(title, body),
    onSuccess: () => {
      // instantly update the cache
      queryClient.setQueryData(["posts"], POSTS);
      queryClient.invalidateQueries(["posts"]);
    },
  });
  if (postsQuery.isLoading) {
    return <h1>Loading .....</h1>;
  }
  if (postsQuery.isError) {
    return <h1>Error occured .....</h1>;
  }
  const posts = postsQuery.data;
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        );
      })}
      <button
        disabled={postsMutation.isLoading}
        onClick={() => postsMutation.mutate("Post 4", "Body 4")}
      >
        {" "}
        Add new Post
      </button>
    </>
  );
}

export default App;
