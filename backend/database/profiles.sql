create database if not exists Profiles;
use Profiles;


create table logins (
    userID int primary key,
    username varchar(55) collate utf8mb4_bin,
    email varchar(55) collate utf8mb4_bin,
    password varchar(64) collate utf8mb4_bin);




create table userdata (
    dataID int primary key auto_increment,
    userID int,
    dataType enum('config', 'other', 'userData'),
    dataData varchar(150));

