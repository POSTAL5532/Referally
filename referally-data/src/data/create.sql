CREATE TABLE users
(
    id             varchar(36)  NOT NULL,
    login          varchar(255) NOT NULL UNIQUE,
    email          varchar(255) NOT NULL UNIQUE,
    password       varchar(255) NOT NULL,
    role           varchar(255) NOT NULL,
    reg_date       date         NOT NULL,
    status         varchar(255) NOT NULL,
    confirm_status varchar(255) NOT NULL,
    PRIMARY KEY (id)
);