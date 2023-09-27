import React from "react";
import { POSTS, createPosts } from "./App";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

import { v4 } from "uuid";

function Example2() {
  const queryClient = useQueryClient();
  const titleRef = useRef();
  const bodyRef = useRef();
  const postMutation = useMutation({
    mutationFn: (title, body) => createPosts(title, body),
    onSuccess: () => {
      // instantly update the Cache
      queryClient.setQueriesData([
        "posts",
        createPosts(titleRef.current.value, bodyRef.current.value),
      ]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    postMutation.mutate(titleRef.current.value, bodyRef.current.value);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          ref={titleRef}
          className="title"
          placeholder="Title"
        />
        <input type="text" ref={bodyRef} className="body" placeholder="Body" />
        <button>Add Post</button>
      </form>
    </div>
  );
}

export default Example2;
