-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pod_number` VARCHAR(191) NOT NULL,
    `stream_url` VARCHAR(191) NULL,

    UNIQUE INDEX `pods_pod_number_key`(`pod_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crash_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pod_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    `event_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ai_detected_injury` BOOLEAN NOT NULL,
    `human_verified_injury` BOOLEAN NULL,
    `ai_detected_violation` BOOLEAN NOT NULL,
    `human_verified_violation` BOOLEAN NULL,
    `video_clip_url` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `live_statuses` (
    `pod_id` INTEGER NOT NULL,
    `pod_status` VARCHAR(191) NOT NULL,
    `camera_status` VARCHAR(191) NOT NULL,
    `current_player_id` INTEGER NULL,
    `last_updated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`pod_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `crash_records` ADD CONSTRAINT `crash_records_pod_id_fkey` FOREIGN KEY (`pod_id`) REFERENCES `pods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `crash_records` ADD CONSTRAINT `crash_records_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `live_statuses` ADD CONSTRAINT `live_statuses_pod_id_fkey` FOREIGN KEY (`pod_id`) REFERENCES `pods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `live_statuses` ADD CONSTRAINT `live_statuses_current_player_id_fkey` FOREIGN KEY (`current_player_id`) REFERENCES `players`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
