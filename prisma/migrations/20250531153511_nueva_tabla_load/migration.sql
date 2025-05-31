-- CreateTable
CREATE TABLE "Load" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "pickupEarliest" TIMESTAMP(3) NOT NULL,
    "pickupLatest" TIMESTAMP(3),
    "pickupHours" TEXT,
    "dropOffHours" TEXT,
    "equipmentType" TEXT NOT NULL,
    "equipmentLength" DOUBLE PRECISION NOT NULL,
    "equipmentWeight" DOUBLE PRECISION NOT NULL,
    "isFullLoad" BOOLEAN NOT NULL,
    "comments" TEXT,
    "commodity" TEXT,
    "referenceId" TEXT,
    "contactPhone1" TEXT,
    "contactPhone2" TEXT,
    "contactEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
