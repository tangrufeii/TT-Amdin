-- 表结构 test
CREATE TABLE IF NOT EXISTS `test` (
  `name` VARCHAR(255) COMMENT '姓名',
  `sex` VARCHAR(255) COMMENT '性别',
  `age` INT COMMENT '年龄',
  `id` INT NOT NULL COMMENT 'id'
  ,PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='test';
