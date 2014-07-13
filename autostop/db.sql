CREATE DATABASE autostop
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

INSERT INTO auto_auser
VALUES (2, "w32323", "2014-05-20 15:29:08", 0, "lion", "", "", "test@ya.ru", 0,1,"2014-05-20 15:29:08",0, "2014-05-20 15:29:08" , "2014-05-20 15:29:08");
INSERT INTO auto_auser
VALUES (3, "ewdewd", "2014-05-20 15:29:08", 0, "lexx", "", "", "lexx@ya.ru", 0,1,"2014-05-20 15:29:08",0, "2014-05-20 15:29:08" , "2014-05-20 15:29:08");



-- for drop
SET FOREIGN_KEY_CHECKS = 0;
SET GROUP_CONCAT_MAX_LEN=32768;
SET @tables = NULL;
SELECT GROUP_CONCAT(table_name) INTO @tables
  FROM information_schema.tables
  WHERE table_schema = (SELECT DATABASE());
SELECT IFNULL(@tables,'dummy') INTO @tables;

SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;

-- for drop