-- CreateTable
CREATE TABLE `EntradaDeConta` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('RECEBER', 'PAGAR') NOT NULL,
    `status` ENUM('PENDENTE', 'PAGO') NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `dataDeVencimento` DATETIME(3) NOT NULL,
    `dataDePagamento` DATETIME(3) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
