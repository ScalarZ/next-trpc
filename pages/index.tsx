import { useRef } from "react";
import { trpc } from "../utils/trpc";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function App() {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: users } = trpc.getUsers.useQuery();

  const { mutate } = trpc.createUser.useMutation({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [["getUsers"], { type: "query" }],
      });
    },
  });

  if (!users) {
    return (
      <div className="py-8 min-h-screen bg-zinc-900 text-white text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-8 min-h-screen bg-zinc-900 text-white">
      <h1 className="text-2xl text-center font-semibold">Nextjs - tRPC</h1>
      <div className="mt-4 flex justify-center gap-x-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="type username"
          className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded"
        />
        <button
          className="px-4 font-medium bg-zinc-700 rounded"
          onClick={async () => {
            if (!inputRef.current || !inputRef.current?.value) return;
            mutate(inputRef.current.value);
          }}
        >
          Add user
        </button>
      </div>
      <ul className="mt-2 text-xl text-center">
        {users.map((username, i) => (
          <li key={i}>{username}</li>
        ))}
      </ul>
    </div>
  );
}
