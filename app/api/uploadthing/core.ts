import { auth } from "@clerk/nextjs/server";
import { url } from "inspector";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new UploadThingError("Unauthorized");
    return { userId };
}

export const ourFileRouter = {
    courseImage: f({ image: { maxFileCount: 1, maxFileSize: "32MB"} })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
        console.log("Upload complete", url);
        return { success: true };
    }),
    // .onUploadComplete((data) => {
    //     console.log("Upload complete", data);
    //     return { success: true };
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async() => {}),
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB"} })
    .middleware(() => handleAuth())
    .onUploadComplete(async() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
