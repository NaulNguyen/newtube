import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

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
