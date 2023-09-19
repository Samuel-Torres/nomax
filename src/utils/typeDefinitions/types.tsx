import { Prisma } from "@prisma/client";

const postBodyAndAuthor = Prisma.validator<Prisma.PostsArgs>()({
  select: {
    id: true,
    authorId: true,
    createdAT: true,
    imageSrc: true,
    videoSrc: true,
    postBody: true,
    author: true,
    comments: true,
  },
});

export type PostWithAuthor = Prisma.PostsGetPayload<typeof postBodyAndAuthor>;
