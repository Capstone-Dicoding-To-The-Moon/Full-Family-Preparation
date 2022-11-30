-- CreateTable
CREATE TABLE `komentar_forum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `authorId` INTEGER NOT NULL,
    `forumId` INTEGER NOT NULL,
    `thumbs_up` INTEGER NOT NULL DEFAULT 0,
    `thumbs_down` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `komentar_forum_authorId_fkey`(`authorId`),
    INDEX `komentar_forum_forumId_fkey`(`forumId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `komentar_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `authorId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `thumbs_up` INTEGER NOT NULL DEFAULT 0,
    `thumbs_down` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `komentar_post_authorId_fkey`(`authorId`),
    INDEX `komentar_post_postId_fkey`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_post` (
    `postId` INTEGER NOT NULL,
    `kategoriId` INTEGER NOT NULL,

    INDEX `kategori_post_kategoriId_fkey`(`kategoriId`),
    PRIMARY KEY (`postId`, `kategoriId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_forum` (
    `forumId` INTEGER NOT NULL,
    `kategoriId` INTEGER NOT NULL,

    INDEX `kategori_forum_kategoriId_fkey`(`kategoriId`),
    PRIMARY KEY (`forumId`, `kategoriId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `image_large` VARCHAR(100) NOT NULL DEFAULT 'forum/default-large.jpg',
    `image_small` VARCHAR(100) NOT NULL DEFAULT 'forum/default-small.jpg',
    `authorId` INTEGER NOT NULL,
    `thumbs_up` INTEGER NOT NULL DEFAULT 0,
    `thumbs_down` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Forum_authorId_fkey`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(50) NOT NULL,

    INDEX `Kategori_authorId_fkey`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,

    INDEX `Log_authorId_fkey`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `image_large` VARCHAR(100) NOT NULL DEFAULT 'post/default-large.jpg',
    `image_small` VARCHAR(100) NOT NULL DEFAULT 'post/default-small.jpg',
    `authorId` INTEGER NOT NULL,
    `thumbs_up` INTEGER NOT NULL DEFAULT 0,
    `thumbs_down` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Post_authorId_fkey`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `image_large` VARCHAR(100) NOT NULL DEFAULT 'user/default-large.jpg',
    `image_small` VARCHAR(100) NOT NULL DEFAULT 'user/default-small.jpg',
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_roleId_fkey`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `komentar_forum` ADD CONSTRAINT `komentar_forum_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar_forum` ADD CONSTRAINT `komentar_forum_forumId_fkey` FOREIGN KEY (`forumId`) REFERENCES `forum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar_post` ADD CONSTRAINT `komentar_post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar_post` ADD CONSTRAINT `komentar_post_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_post` ADD CONSTRAINT `kategori_post_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_post` ADD CONSTRAINT `kategori_post_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_forum` ADD CONSTRAINT `kategori_forum_forumId_fkey` FOREIGN KEY (`forumId`) REFERENCES `forum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_forum` ADD CONSTRAINT `kategori_forum_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `forum` ADD CONSTRAINT `Forum_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori` ADD CONSTRAINT `Kategori_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `Log_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
