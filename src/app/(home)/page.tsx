"use client";

import { trpc } from "@/trpc/client";

export default function Home() {
    const { data } = trpc.hello.useQuery({ text: "Minh Luan" });

    return (
        <div>
            <h1>Client component: {data?.greeting}</h1>
        </div>
    );
}
