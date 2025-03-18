-- CreateTable
CREATE TABLE "summary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL DEFAULT '2025',
    "cuenta" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "depositos" REAL NOT NULL,
    "retiros" REAL NOT NULL,
    "saldo" REAL NOT NULL,
    "fecha" DATETIME NOT NULL,
    "extra" JSONB NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "summary_year_idx" ON "summary"("year");
