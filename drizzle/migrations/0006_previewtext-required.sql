PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`key` text NOT NULL,
	`category` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`draft` integer DEFAULT false NOT NULL,
	`thumbnail` text NOT NULL,
	`preview_text` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "title", "key", "category", "data", "draft", "thumbnail", "preview_text", "created_at", "updated_at", "deleted") SELECT "id", "title", "key", "category", "data", "draft", "thumbnail", "preview_text", "created_at", "updated_at", "deleted" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `posts_key_unique` ON `posts` (`key`);