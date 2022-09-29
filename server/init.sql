SET FOREIGN_KEY_CHECKS = 0;

truncate table role;

INSERT INTO role (`create_at`, `update_at`, `del`, `name`, `intro`)
VALUES
(NOW(), NOW(), 0, '1', '1');

truncate table auth;
INSERT INTO auth (`create_at`, `update_at`, `del`, `name`, `intro`)
VALUES
(NOW(), NOW(), 0, '1', '1');

truncate table role_auths_auth;
insert INTO role_auths_auth (`authId`, `roleId`)
values (1, 1);
SET FOREIGN_KEY_CHECKS = 1;

SELECT * from role