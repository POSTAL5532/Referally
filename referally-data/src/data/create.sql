CREATE TABLE users
(
    id             varchar(36)  NOT NULL,
    login          varchar(255) NOT NULL UNIQUE,
    email          varchar(255) NOT NULL UNIQUE,
    password       varchar(255) NOT NULL,
    PRIMARY KEY (id)
);