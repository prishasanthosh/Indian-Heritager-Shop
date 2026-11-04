CREATE TYPE "public"."vendor_notification_type" AS ENUM('application_submitted', 'application_approved', 'application_rejected', 'vendor_suspended', 'product_submitted', 'product_approved', 'product_rejected', 'new_order', 'order_status', 'low_inventory');--> statement-breakpoint
CREATE TYPE "public"."product_moderation_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."vendor_status" AS ENUM('pending', 'approved', 'rejected', 'suspended');--> statement-breakpoint
CREATE TABLE "marketplace_audit_log" (
	"id" text PRIMARY KEY NOT NULL,
	"actor_user_id" text,
	"vendor_id" text,
	"action" text NOT NULL,
	"details" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendor_notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"vendor_id" text NOT NULL,
	"type" "vendor_notification_type" NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendor_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" "vendor_status" DEFAULT 'pending' NOT NULL,
	"store_name" text NOT NULL,
	"store_slug" text NOT NULL,
	"contact_name" text NOT NULL,
	"phone" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"business_type" text DEFAULT '' NOT NULL,
	"business_address" text DEFAULT '' NOT NULL,
	"city" text DEFAULT '' NOT NULL,
	"state" text DEFAULT '' NOT NULL,
	"pincode" text DEFAULT '' NOT NULL,
	"country" text DEFAULT 'India' NOT NULL,
	"gst_number_encrypted" text DEFAULT '' NOT NULL,
	"pan_number_encrypted" text DEFAULT '' NOT NULL,
	"bank_holder_encrypted" text DEFAULT '' NOT NULL,
	"bank_account_encrypted" text DEFAULT '' NOT NULL,
	"ifsc_encrypted" text DEFAULT '' NOT NULL,
	"logo" text DEFAULT '' NOT NULL,
	"banner" text DEFAULT '' NOT NULL,
	"website" text DEFAULT '' NOT NULL,
	"instagram" text DEFAULT '' NOT NULL,
	"facebook" text DEFAULT '' NOT NULL,
	"rejection_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vendor_profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "vendor_profiles_store_slug_unique" UNIQUE("store_slug")
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "vendor_id" text;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "fulfilment_status" text DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "tracking_number" text;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "carrier" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "vendor_id" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "moderation_status" "product_moderation_status" DEFAULT 'approved' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "moderation_reason" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "materials" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "dimensions" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "weight" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "origin" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "specifications" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "craft_type" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "artisan_info" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "region_of_origin" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "gi_tag_info" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "marketplace_audit_log" ADD CONSTRAINT "marketplace_audit_log_actor_user_id_user_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketplace_audit_log" ADD CONSTRAINT "marketplace_audit_log_vendor_id_vendor_profiles_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor_profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_notifications" ADD CONSTRAINT "vendor_notifications_vendor_id_vendor_profiles_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_profiles" ADD CONSTRAINT "vendor_profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "marketplace_audit_action_idx" ON "marketplace_audit_log" USING btree ("action");--> statement-breakpoint
CREATE INDEX "vendor_notification_vendor_idx" ON "vendor_notifications" USING btree ("vendor_id");--> statement-breakpoint
CREATE INDEX "vendor_status_idx" ON "vendor_profiles" USING btree ("status");--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_vendor_id_vendor_profiles_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor_profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_vendor_id_vendor_profiles_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor_profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "order_items_vendor_id_idx" ON "order_items" USING btree ("vendor_id");--> statement-breakpoint
CREATE INDEX "product_vendor_idx" ON "products" USING btree ("vendor_id");--> statement-breakpoint
CREATE INDEX "product_moderation_idx" ON "products" USING btree ("moderation_status");