create database if not exists Profiles;
use Profiles;


create table logins (
    userID int primary key,
    username varchar(55),
    email varchar(55),
    password varchar(55));

insert into logins values("", '', '', '');



create table datas (
    dataType enum('config', 'other', 'userData'),
    user varchar(35),
    dataData varchar(150));


create table settings (
    settingName varchar(45),
    user varchar(35), 
    settingValue varchar(40));

