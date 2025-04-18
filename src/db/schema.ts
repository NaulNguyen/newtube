import { pgTable, uuid, text, timestamp, uniqueIndex, integer, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable(
    "users",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        clerckId: text("clerck_id").unique().notNull(),
        name: text("name").notNull(),
        imageUrl: text("image_url").notNull(),
        createAt: timestamp("create_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (t) => [uniqueIndex("clerck_id_idx").on(t.clerckId)]
);

export const userRelations = relations(users, ({ many }) => ({
    videos: many(videos),
}));

export const categories = pgTable(
    "categories",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull().unique(),
        description: text("description"),
        createAt: timestamp("create_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (t) => [uniqueIndex("name_idx").on(t.name)]
);

export const categoryRelations = relations(categories, ({ many }) => ({
    videos: many(videos),
}));

export const videoVisibility = pgEnum("video_visibility", ["private", "public"]);

export const videos = pgTable("videos", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    muxStatus: text("mux_status"),
    muxAssetId: text("mux_asset_id").unique(),
    muxUploadId: text("mux_upload_id").unique(),
    muxPlayBackId: text("mux_play_back_id").unique(),
    muxTrackId: text("mux_track_id").unique(),
    muxTrackStatus: text("mux_track_status"),
    thumbnailUrl: text("thumbnail_url"),
    previewUrl: text("preview_url"),
    duration: integer("duration").default(0).notNull(),
    visibility: videoVisibility("visibility").default("private").notNull(),
    userId: uuid("user_id")
        .references(() => users.id, {
            onDelete: "cascade", // khi xoa user thi xoa luon video cua user do
        })
        .notNull(),
    categoryId: uuid("category_id").references(() => categories.id, {
        onDelete: "set null", // khi xoa category thi set null cho video co category do
    }),
    createAt: timestamp("create_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const videoRelations = relations(videos, ({ one }) => ({
    user: one(users, {
        fields: [videos.userId],
        references: [users.id],
    }),
    category: one(categories, {
        fields: [videos.categoryId],
        references: [categories.id],
    }),
}));
