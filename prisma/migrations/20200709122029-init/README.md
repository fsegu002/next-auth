# Migration `20200709122029-init`

This migration has been generated at 7/9/2020, 12:20:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,
"firstName" text   ,
"id" SERIAL,
"lastName" text   ,
"password" text  NOT NULL ,
"passwordConfirmation" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200709122029-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,20 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id            Int      @default(autoincrement()) @id
+  email         String   @unique
+  password      String
+  passwordConfirmation String
+  firstName     String?
+  lastName      String?
+}
```


