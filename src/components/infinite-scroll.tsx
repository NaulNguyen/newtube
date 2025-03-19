import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface InfiniteScrollProps {
    isManual?: boolean;
    hasNextPage: boolean;
    isFectchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfiniteScroll = ({
    isManual = false,
    hasNextPage,
    isFectchingNextPage,
    fetchNextPage,
}: InfiniteScrollProps) => {
    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: 0.5,
        rootMargin: "100px",
    });

    useEffect(() => {
        if (isIntersecting && hasNextPage && !isFectchingNextPage && !isManual) {
            fetchNextPage();
        }
    }, [hasNextPage, isFectchingNextPage, isManual, isIntersecting, fetchNextPage]);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div ref={targetRef} className="h-1" />
            {hasNextPage ? (
                <Button
                    variant="secondary"
                    disabled={!hasNextPage || isFectchingNextPage}
                    onClick={() => fetchNextPage()}>
                    {isFectchingNextPage ? "Loading..." : "Load more"}
                </Button>
            ) : (
                <p className="text-xs text-muted-foreground">You have reach the end of the list</p>
            )}
        </div>
    );
};
