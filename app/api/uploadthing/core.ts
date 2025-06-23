import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.ufsUrl);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { uploadedBy: "SILVER" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
