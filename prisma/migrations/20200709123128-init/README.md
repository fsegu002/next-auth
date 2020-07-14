# Migration `20200709123128-init`

This migration has been generated at 7/9/2020, 12:31:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Login" (
"id" SERIAL,
"lastLogin" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."Login" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200709122029-init..20200709123128-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -16,5 +16,13 @@
   password      String
   passwordConfirmation String
   firstName     String?
   lastName      String?
+  logins        Login[]
+}
+
+model Login {
+  id        Int @default(autoincrement()) @id
+  lastLogin DateTime @default(now())
+  user      User @relation(fields: [userId], references: [id])
+  userId    Int
 }
```
