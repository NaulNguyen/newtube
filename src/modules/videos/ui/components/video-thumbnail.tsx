import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface VideoThumbnailProps {
    title: string;
    imageUrl?: string | null;
    previewUrl?: string | null;
    duration: number;
}
export const VideoThumbnail = ({ imageUrl, title, previewUrl, duration }: VideoThumbnailProps) => {
    return (
        <div className="relative group">
            {/* Thumbnail wrapper */}
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image
                    unoptimized={!!previewUrl}
                    src={imageUrl ?? "/placeholder.svg"}
                    alt={title}
                    fill
                    className="size-full object-cover group-hover:opacity-0"
                />
                <Image
                    src={previewUrl ?? "/placeholder.svg"}
                    alt={title}
                    fill
                    className="size-full object-cover opacity-0 group-hover:opacity-100"
                />
            </div>

            {/* Video Duration Box */}
            <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
                {formatDuration(duration)}
            </div>
        </div>
    );
};
