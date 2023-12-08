-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "completend" BOOLEAN DEFAULT false
);
INSERT INTO "new_tarefa" ("completend", "id", "name") SELECT "completend", "id", "name" FROM "tarefa";
DROP TABLE "tarefa";
ALTER TABLE "new_tarefa" RENAME TO "tarefa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
