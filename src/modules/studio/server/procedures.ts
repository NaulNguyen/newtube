import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, and, or, lt, desc } from "drizzle-orm";
import { z } from "zod";

export const studioRouter = createTRPCRouter({
    getMany: protectedProcedure
        .input(
            //phân trang
            z.object({
                cursor: z
                    .object({
                        id: z.string().uuid(), //UUID của video cuối cùng trong trang trước.
                        updateAt: z.date(), //Ngày cập nhật của video cuối cùng trong trang trước.
                    })
                    .nullish(),
                limit: z.number().min(1).max(100), //Số lượng video cần lấy (tối thiểu 1, tối đa 100).
            })
        )
        .query(async ({ ctx, input }) => {
            const { cursor, limit } = input;
            const { id: userId } = ctx.user;

            const data = await db
                .select()
                .from(videos)
                .where(
                    and(
                        eq(videos.userId, userId), // Lọc theo userId của user đang đăng nhập
                        cursor
                            ? or(
                                  lt(videos.updatedAt, cursor.updateAt), // Lấy video có updatedAt < cursor.updatedAt
                                  and(
                                      eq(videos.updatedAt, cursor.updateAt), // Nếu updatedAt giống nhau thì so sánh tiếp theo id
                                      lt(videos.id, cursor.id)
                                  )
                              )
                            : undefined
                    )
                )
                .orderBy(desc(videos.updatedAt), desc(videos.id)) // Sắp xếp theo updatedAt giảm dần, nếu trùng thì theo id
                .limit(limit + 1); // Lấy nhiều hơn 1 phần tử để kiểm tra còn dữ liệu hay không

            const hasMore = data.length > limit;
            // remove last item if there is more data
            const items = hasMore ? data.slice(0, -1) : data;
            // set the next cursor to the last item if there is more data
            const lastItem = items[items.length - 1];
            const nextCursor = hasMore ? { id: lastItem.id, updateAt: lastItem.updatedAt } : null;

            return {
                items,
                nextCursor,
            };
        }),
});
