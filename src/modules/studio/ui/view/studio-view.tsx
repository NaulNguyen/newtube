import { VideosSection } from "../section/video-section";

export const StudioView = () => {
    return (
        <div className="flex flex-col gap-y-6 pt-2.5">
            <div className="px-4">
                <h1 className="text-2xl font-bold">Channel content</h1>
                <p className="text-sm text-muted-foreground">Manage your content and videos</p>
            </div>
            <VideosSection />
        </div>
    );
};
