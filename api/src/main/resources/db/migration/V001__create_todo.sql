CREATE TABLE todo
(
    id        bigint NOT NULL AUTO_INCREMENT,
    text      varchar(255) DEFAULT NULL,
    completed bit          DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8;

INSERT INTO todo(text, completed)
VALUES ('buy coffee', 0),
       ('write code', 0),
       ('get things done', 1);
