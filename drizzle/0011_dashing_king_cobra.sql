ALTER TYPE "public"."item_type" ADD VALUE 'file';--> statement-breakpoint
ALTER TYPE "public"."item_type" ADD VALUE 'image';--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "file_url" text;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "file_public_id" text;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "file_name" text;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "file_size" integer;