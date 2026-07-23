-- AlterTable
ALTER TABLE "public"."Ticket" ALTER COLUMN "category" SET DEFAULT 'IT_SUPPORT';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "department" TEXT,
ADD COLUMN     "phone" TEXT;
