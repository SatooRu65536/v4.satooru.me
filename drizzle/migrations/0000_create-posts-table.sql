CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`key` text NOT NULL,
	`category` text NOT NULL,
	`icons` text DEFAULT '[]' NOT NULL,
	`draft` integer DEFAULT false NOT NULL,
	`thumbnail` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_key_unique` ON `posts` (`key`);